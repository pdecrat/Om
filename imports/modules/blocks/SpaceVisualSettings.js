import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Container,
  Paper,
  Divider,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Button,
  Slider,
  Box,
  Tabs,
  Tab,
  Collapse
} from '@material-ui/core';
import { SketchPicker } from 'react-color';
import SimpleSchema from 'simpl-schema';
import Blocks from '/imports/core/Blocks';
import Actions from '/imports/core/Actions';
import Data from '/imports/core/Data';
import Spaces from '/imports/core/Spaces/Spaces';
import { Collections } from '/imports/core/Collections';
import { Context } from '/imports/ui/_providers/ContextProvider';
import useCall from '/imports/ui/_hooks/useCall';

// Définition des styles du composant
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  formControl: {
    margin: theme.spacing(1, 0),
    minWidth: '100%',
  },
  colorPreview: {
    width: '100%',
    height: 30,
    borderRadius: 4,
    marginTop: theme.spacing(1),
    border: '1px solid rgba(0, 0, 0, 0.23)',
    cursor: 'pointer',
  },
  colorPickerPopover: {
    position: 'absolute',
    zIndex: 2,
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1, 0),
  },
  sliderLabel: {
    marginBottom: theme.spacing(1),
  },
  slider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  tabPanel: {
    padding: theme.spacing(2, 0),
  },
}));

// Définition des options disponibles
const fontFamilyOptions = [
  { value: 'Roboto, sans-serif', label: 'Roboto (Sans-serif)' },
  { value: 'Montserrat, sans-serif', label: 'Montserrat (Sans-serif)' },
  { value: 'Open Sans, sans-serif', label: 'Open Sans (Sans-serif)' },
  { value: 'Lato, sans-serif', label: 'Lato (Sans-serif)' },
  { value: 'Raleway, sans-serif', label: 'Raleway (Sans-serif)' },
  { value: 'Playfair Display, serif', label: 'Playfair Display (Serif)' },
  { value: 'Merriweather, serif', label: 'Merriweather (Serif)' },
  { value: 'Georgia, serif', label: 'Georgia (Serif)' },
  { value: 'Courier New, monospace', label: 'Courier New (Monospace)' },
  { value: 'Arial, sans-serif', label: 'Arial (Sans-serif)' },
];

const spacingFactorOptions = [
  { value: 0.5, label: 'Très compact' },
  { value: 0.75, label: 'Compact' },
  { value: 1, label: 'Normal' },
  { value: 1.25, label: 'Aéré' },
  { value: 1.5, label: 'Très aéré' },
];

// Panneau de Tab pour organiser les options
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`visual-settings-tabpanel-${index}`}
      aria-labelledby={`visual-settings-tab-${index}`}
      {...other}
    >
      <Collapse in={value === index}>
        <Box className={props.className}>{children}</Box>
      </Collapse>
    </div>
  );
}

/**
 * Composant de sélection de couleur avec prévisualisateur
 */
function ColorPicker({ color, onChange, label }) {
  const classes = useStyles();
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState(color || '#FFFFFF');

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setCurrentColor(color.hex);
    onChange(color.hex);
  };

  return (
    <div>
      <Typography variant="body2" gutterBottom>{label}</Typography>
      <div
        className={classes.colorPreview}
        onClick={handleClick}
        style={{ backgroundColor: currentColor }}
      />
      {displayColorPicker ? (
        <div className={classes.colorPickerPopover}>
          <div style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }} onClick={handleClose} />
          <SketchPicker color={currentColor} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
}

/**
 * Composant principal du bloc SpaceVisualSettings
 */
Blocks.register('SpaceVisualSettings', ({ block }) => {
  const classes = useStyles();
  const { context } = useContext(Context);
  const [tabValue, setTabValue] = useState(0);

  // Initialiser le hook useCall pour l'action applyThemeToSpace
  const callApplyThemeToSpace = useCall('applyThemeToSpace');

  // Valeurs par défaut ou existantes
  const defaultSettings = {
    // Couleurs
    primaryColor: '#3f51b5',
    secondaryColor: '#f50057',
    backgroundColor: '#ffffff',
    textColor: '#000000',

    // Typographie
    headingFontFamily: 'Roboto, sans-serif',
    bodyFontFamily: 'Roboto, sans-serif',
    baseTextSize: 16,
    headerScale: 1.2,

    // Mise en page
    contentWidth: 'md',
    spacing: 1,
    borderRadius: 4,

    // Options avancées
    useShadows: true,
    shadowIntensity: 3,
    useAnimations: true,
    useResponsiveLayout: true,
    blockSpacing: 2,
  };

  // État local pour les paramètres
  const [settings, setSettings] = useState({
    ...defaultSettings,
    ...(context && context.theme ? context.theme : {})
  });

  // Mise à jour lors du changement de contexte
  useEffect(() => {
    if (context && context.theme) {
      setSettings(prevSettings => ({
        ...prevSettings,
        ...context.theme
      }));
    }
  }, [context]);

  // Gestion des changements de champs
  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox'
      ? event.target.checked
      : event.target.value;

    setSettings({
      ...settings,
      [field]: value
    });
  };

  // Gestion des changements de couleur
  const handleColorChange = (field) => (color) => {
    setSettings({
      ...settings,
      [field]: color
    });
  };

  // Gestion des changements de slider
  const handleSliderChange = (field) => (_, value) => {
    setSettings({
      ...settings,
      [field]: value
    });
  };

  // Changement de tab
  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
  };

  // Application des paramètres à l'espace
  const applySettings = () => {
    if (context && context._id) {
      // Création d'un thème Material-UI basé sur les paramètres
      const theme = {
        palette: {
          primary: {
            main: settings.primaryColor,
          },
          secondary: {
            main: settings.secondaryColor,
          },
          background: {
            default: settings.backgroundColor,
          },
          text: {
            primary: settings.textColor,
          },
        },
        typography: {
          fontFamily: settings.bodyFontFamily,
          fontSize: settings.baseTextSize,
          h1: {
            fontFamily: settings.headingFontFamily,
            fontSize: `${settings.baseTextSize * Math.pow(settings.headerScale, 5)}px`,
          },
          h2: {
            fontFamily: settings.headingFontFamily,
            fontSize: `${settings.baseTextSize * Math.pow(settings.headerScale, 4)}px`,
          },
          h3: {
            fontFamily: settings.headingFontFamily,
            fontSize: `${settings.baseTextSize * Math.pow(settings.headerScale, 3)}px`,
          },
          h4: {
            fontFamily: settings.headingFontFamily,
            fontSize: `${settings.baseTextSize * Math.pow(settings.headerScale, 2)}px`,
          },
          h5: {
            fontFamily: settings.headingFontFamily,
            fontSize: `${settings.baseTextSize * settings.headerScale}px`,
          },
          h6: {
            fontFamily: settings.headingFontFamily,
            fontSize: `${settings.baseTextSize}px`,
          },
        },
        shape: {
          borderRadius: settings.borderRadius,
        },
        spacing: (factor) => `${8 * settings.spacing * factor}px`,
        props: {
          MuiContainer: {
            maxWidth: settings.contentWidth,
          },
        },
        shadows: settings.useShadows
          ? Array(25).fill('').map((_, i) =>
              i === 0
                ? 'none'
                : `0px ${i}px ${i * settings.shadowIntensity}px rgba(0,0,0,${0.1 + (i * 0.01)})`
            )
          : Array(25).fill('none'),
        transitions: {
          easing: {
            easeInOut: settings.useAnimations ? 'cubic-bezier(0.4, 0, 0.2, 1)' : 'linear',
            easeOut: settings.useAnimations ? 'cubic-bezier(0.0, 0, 0.2, 1)' : 'linear',
            easeIn: settings.useAnimations ? 'cubic-bezier(0.4, 0, 1, 1)' : 'linear',
          },
          duration: {
            shortest: settings.useAnimations ? 150 : 0,
            shorter: settings.useAnimations ? 200 : 0,
            short: settings.useAnimations ? 250 : 0,
            standard: settings.useAnimations ? 300 : 0,
            complex: settings.useAnimations ? 375 : 0,
            enteringScreen: settings.useAnimations ? 225 : 0,
            leavingScreen: settings.useAnimations ? 195 : 0,
          },
        },
        // Paramètres personnalisés pour les blocs
        custom: {
          blockSpacing: settings.blockSpacing,
          useResponsiveLayout: settings.useResponsiveLayout
        },
      };

      // Utilisation du hook useCall pour appliquer le thème
      callApplyThemeToSpace({ theme }, (error) => {
        if (error) {
          console.error('Erreur lors de la mise à jour du thème:', error);
          alert('Une erreur est survenue lors de la mise à jour du thème.');
        } else {
          alert('Paramètres visuels appliqués avec succès!');
        }
      });
    }
  };

  // Réinitialisation des paramètres
  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.root}>
        <Typography variant="h5" component="h2" className={classes.title}>
          Paramètres visuels de l'espace
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Couleurs" />
          <Tab label="Typographie" />
          <Tab label="Mise en page" />
          <Tab label="Avancé" />
        </Tabs>

        {/* Section Couleurs */}
        <TabPanel value={tabValue} index={0} className={classes.tabPanel}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <ColorPicker
                color={settings.primaryColor}
                onChange={handleColorChange('primaryColor')}
                label="Couleur primaire"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ColorPicker
                color={settings.secondaryColor}
                onChange={handleColorChange('secondaryColor')}
                label="Couleur secondaire"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ColorPicker
                color={settings.backgroundColor}
                onChange={handleColorChange('backgroundColor')}
                label="Couleur d'arrière-plan"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ColorPicker
                color={settings.textColor}
                onChange={handleColorChange('textColor')}
                label="Couleur du texte"
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Section Typographie */}
        <TabPanel value={tabValue} index={1} className={classes.tabPanel}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="heading-font-family-label">Police des titres</InputLabel>
                <Select
                  labelId="heading-font-family-label"
                  value={settings.headingFontFamily}
                  onChange={handleChange('headingFontFamily')}
                  label="Police des titres"
                >
                  {fontFamilyOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="body-font-family-label">Police du corps de texte</InputLabel>
                <Select
                  labelId="body-font-family-label"
                  value={settings.bodyFontFamily}
                  onChange={handleChange('bodyFontFamily')}
                  label="Police du corps de texte"
                >
                  {fontFamilyOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography id="base-text-size-slider" className={classes.sliderLabel}>
                Taille de base du texte: {settings.baseTextSize}px
              </Typography>
              <Slider
                className={classes.slider}
                value={settings.baseTextSize}
                onChange={handleSliderChange('baseTextSize')}
                aria-labelledby="base-text-size-slider"
                min={12}
                max={20}
                step={1}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography id="header-scale-slider" className={classes.sliderLabel}>
                Échelle des titres: {settings.headerScale.toFixed(1)}
              </Typography>
              <Slider
                className={classes.slider}
                value={settings.headerScale}
                onChange={handleSliderChange('headerScale')}
                aria-labelledby="header-scale-slider"
                min={1}
                max={1.5}
                step={0.1}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Section Mise en page */}
        <TabPanel value={tabValue} index={2} className={classes.tabPanel}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="content-width-label">Largeur du contenu</InputLabel>
                <Select
                  labelId="content-width-label"
                  value={settings.contentWidth}
                  onChange={handleChange('contentWidth')}
                  label="Largeur du contenu"
                >
                  <MenuItem value="xs">Extra petit (XS)</MenuItem>
                  <MenuItem value="sm">Petit (SM)</MenuItem>
                  <MenuItem value="md">Moyen (MD)</MenuItem>
                  <MenuItem value="lg">Large (LG)</MenuItem>
                  <MenuItem value="xl">Extra large (XL)</MenuItem>
                  <MenuItem value={false}>Pleine largeur</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="spacing-label">Facteur d'espacement</InputLabel>
                <Select
                  labelId="spacing-label"
                  value={settings.spacing}
                  onChange={handleChange('spacing')}
                  label="Facteur d'espacement"
                >
                  {spacingFactorOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label} ({option.value})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography id="border-radius-slider" className={classes.sliderLabel}>
                Arrondi des coins: {settings.borderRadius}px
              </Typography>
              <Slider
                className={classes.slider}
                value={settings.borderRadius}
                onChange={handleSliderChange('borderRadius')}
                aria-labelledby="border-radius-slider"
                min={0}
                max={24}
                step={2}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography id="block-spacing-slider" className={classes.sliderLabel}>
                Espacement entre blocs: {settings.blockSpacing}
              </Typography>
              <Slider
                className={classes.slider}
                value={settings.blockSpacing}
                onChange={handleSliderChange('blockSpacing')}
                aria-labelledby="block-spacing-slider"
                min={0}
                max={6}
                step={1}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Section Avancé */}
        <TabPanel value={tabValue} index={3} className={classes.tabPanel}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.useShadows}
                    onChange={handleChange('useShadows')}
                    color="primary"
                  />
                }
                label="Utiliser les ombres"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.useAnimations}
                    onChange={handleChange('useAnimations')}
                    color="primary"
                  />
                }
                label="Utiliser les animations"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.useResponsiveLayout}
                    onChange={handleChange('useResponsiveLayout')}
                    color="primary"
                  />
                }
                label="Utiliser la mise en page responsive"
              />
            </Grid>

            {settings.useShadows && (
              <Grid item xs={12} sm={6}>
                <Typography id="shadow-intensity-slider" className={classes.sliderLabel}>
                  Intensité des ombres: {settings.shadowIntensity}
                </Typography>
                <Slider
                  className={classes.slider}
                  value={settings.shadowIntensity}
                  onChange={handleSliderChange('shadowIntensity')}
                  aria-labelledby="shadow-intensity-slider"
                  min={1}
                  max={6}
                  step={1}
                  marks
                  valueLabelDisplay="auto"
                  disabled={!settings.useShadows}
                />
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <Divider className={classes.divider} />

        <Grid container spacing={2} justify="flex-end">
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={resetSettings}
            >
              Réinitialiser
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={applySettings}
            >
              Appliquer les paramètres
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
});

// Enregistrement de l'effet qui permet d'appliquer un thème à un espace
Actions.registerEffect('applyThemeToSpace', {
  fn({ data: { theme }, target }) {
    target.theme = theme;
  },
  dataSchema() {
    return new SimpleSchema({
      theme: {
        type: Object,
        blackbox: true,
      },
    });
  },
  form(data, onChange) {
    return null;
  }
});

// Ajout de l'action correspondante dans la base de données de chaque espace
if (Meteor.isServer) {
  Meteor.startup(() => {
    // Parcourir tous les espaces existants
    Spaces.find().forEach(space => {
      const collection = Collections.get(space._id);
      if (collection) {
        // Vérifier si l'action existe déjà dans cet espace
        const existingAction = collection.find({
          root: space._id,
          type: "action",
          name: "applyThemeToSpace"
        }).count();

        // Si l'action n'existe pas, la créer pour cet espace
        if (existingAction === 0) {
          collection.insert({
            root: space._id,
            type: "action",
            name: "applyThemeToSpace",
            effects: [
              { name: 'applyThemeToSpace' }
            ]
          });
        }
      }
    });
  });

  // Extension de la classe SpaceCollection pour ajouter l'action aux nouveaux espaces
  const originalInsert = Spaces.insert;
  Spaces.insert = function(space, callback) {
    const spaceId = originalInsert.call(this, space, callback);

    if (spaceId && Meteor.isServer) {
      const collection = Collections.get(spaceId);
      if (collection) {
        collection.insert({
          root: spaceId,
          type: "action",
          name: "applyThemeToSpace",
          effects: [
            { name: 'applyThemeToSpace' }
          ]
        });
      }
    }

    return spaceId;
  };
}

// Export nécessaire pour l'importation dans _index.js
export default {};
