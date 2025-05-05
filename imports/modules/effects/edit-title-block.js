import React from 'react';
import SimpleSchema from 'simpl-schema';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import Actions from '/imports/core/Actions';

const useStyles = makeStyles(theme => ({
  formSection: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  sectionTitle: {
    marginBottom: theme.spacing(1),
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 120,
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

// Effet pour éditer un bloc Title
Actions.registerEffect('editTitleBlock', {
  // Fonction qui effectue la modification du bloc
  fn({ data, target }) {
    // Mise à jour des propriétés du bloc avec les données du formulaire
    Object.keys(data).forEach(key => {
      target[key] = data[key];
    });
  },

  // Schéma de validation des données
  dataSchema() {
    return new SimpleSchema({
      // Contenu
      title: { type: String, optional: true },
      subtitle: { type: String, optional: true },

      // Mise en page
      alignment: { type: String, optional: true },
      maxWidth: { type: String, optional: true },
      fullWidth: { type: Boolean, optional: true },
      spacing: { type: Number, optional: true },

      // Style du titre
      variant: { type: String, optional: true },
      component: { type: String, optional: true },
      color: { type: String, optional: true },
      bold: { type: Boolean, optional: true },
      italic: { type: Boolean, optional: true },
      underline: { type: Boolean, optional: true },
      uppercase: { type: Boolean, optional: true },
      lowercase: { type: Boolean, optional: true },
      capitalize: { type: Boolean, optional: true },
      letterSpacing: { type: String, optional: true },
      lineHeight: { type: String, optional: true },
      fontSize: { type: Number, optional: true },
      noMargin: { type: Boolean, optional: true },

      // Style du sous-titre
      subtitleVariant: { type: String, optional: true },
      subtitleComponent: { type: String, optional: true },
      subtitleColor: { type: String, optional: true },
      subtitleBold: { type: Boolean, optional: true },
      subtitleItalic: { type: Boolean, optional: true },
      subtitleUppercase: { type: Boolean, optional: true },
      subtitleLowercase: { type: Boolean, optional: true },
      subtitleCapitalize: { type: Boolean, optional: true },
      subtitleLetterSpacing: { type: String, optional: true },
      subtitleSpacing: { type: Number, optional: true },
      subtitleFontSize: { type: Number, optional: true },
    });
  },

  // Formulaire d'édition du bloc
  form(data, onChange) {
    // const classes = useStyles();

    // Valeurs par défaut pour éviter les valeurs undefined
    const values = {
      // Contenu
      title: data.title || 'Titre par défaut',
      subtitle: data.subtitle || '',

      // Mise en page
      alignment: data.alignment || 'center',
      maxWidth: data.maxWidth || 'md',
      fullWidth: !!data.fullWidth,
      spacing: data.spacing || 2,

      // Style du titre
      variant: data.variant || 'h2',
      component: data.component || 'h1',
      color: data.color || '',
      bold: data.bold !== undefined ? data.bold : true,
      italic: !!data.italic,
      underline: !!data.underline,
      uppercase: !!data.uppercase,
      lowercase: !!data.lowercase,
      capitalize: !!data.capitalize,
      letterSpacing: data.letterSpacing || 'normal',
      lineHeight: data.lineHeight || 'normal',
      fontSize: data.fontSize || '',
      noMargin: !!data.noMargin,

      // Style du sous-titre
      subtitleVariant: data.subtitleVariant || 'subtitle1',
      subtitleComponent: data.subtitleComponent || 'p',
      subtitleColor: data.subtitleColor || '',
      subtitleBold: !!data.subtitleBold,
      subtitleItalic: !!data.subtitleItalic,
      subtitleUppercase: !!data.subtitleUppercase,
      subtitleLowercase: !!data.subtitleLowercase,
      subtitleCapitalize: !!data.subtitleCapitalize,
      subtitleLetterSpacing: data.subtitleLetterSpacing || 'normal',
      subtitleSpacing: data.subtitleSpacing || 1,
      subtitleFontSize: data.subtitleFontSize || '',
      ...data
    };

    // Fonction utilitaire pour créer un gestionnaire d'événements pour les checkboxes
    const handleCheckboxChange = (field) => (event) => {
      const newData = { ...data, [field]: event.target.checked };
      onChange(field)({ target: { value: event.target.checked } });
    };

    return (
      <div>
        {/* SECTION CONTENU */}
        <div >
          <Typography variant="h6" >
            Contenu
          </Typography>

          <TextField
            margin="dense"
            label="Titre"
            fullWidth
            value={values.title}
            onChange={onChange('title')}
          />

          <TextField
            margin="dense"
            label="Sous-titre"
            fullWidth
            multiline
            rows={2}
            value={values.subtitle}
            onChange={onChange('subtitle')}
          />
        </div>

        <Divider  />

        {/* SECTION MISE EN PAGE */}
        <div >
          <Typography variant="h6" >
            Mise en page
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl  fullWidth>
                <InputLabel>Alignement</InputLabel>
                <Select
                  value={values.alignment}
                  onChange={onChange('alignment')}
                >
                  <MenuItem value="left">Gauche</MenuItem>
                  <MenuItem value="center">Centre</MenuItem>
                  <MenuItem value="right">Droite</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl  fullWidth>
                <InputLabel>Largeur maximale</InputLabel>
                <Select
                  value={values.maxWidth}
                  onChange={onChange('maxWidth')}
                  disabled={values.fullWidth}
                >
                  <MenuItem value="xs">Très étroit</MenuItem>
                  <MenuItem value="sm">Étroit</MenuItem>
                  <MenuItem value="md">Moyen</MenuItem>
                  <MenuItem value="lg">Large</MenuItem>
                  <MenuItem value="xl">Très large</MenuItem>
                  <MenuItem value={false}>Aucune limite</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.fullWidth}
                    onChange={handleCheckboxChange('fullWidth')}
                  />
                }
                label="Largeur complète"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                type="number"
                label="Espacement"
                value={values.spacing}
                onChange={onChange('spacing')}
                InputProps={{ inputProps: { min: 0, max: 10 } }}
              />
            </Grid>
          </Grid>
        </div>

        <Divider  />

        {/* SECTION STYLE DU TITRE */}
        <div >
          <Typography variant="h6" >
            Style du titre
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl  fullWidth>
                <InputLabel>Variante</InputLabel>
                <Select
                  value={values.variant}
                  onChange={onChange('variant')}
                >
                  <MenuItem value="h1">Titre 1</MenuItem>
                  <MenuItem value="h2">Titre 2</MenuItem>
                  <MenuItem value="h3">Titre 3</MenuItem>
                  <MenuItem value="h4">Titre 4</MenuItem>
                  <MenuItem value="h5">Titre 5</MenuItem>
                  <MenuItem value="h6">Titre 6</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Couleur"
                placeholder="#000000 ou rgba(0,0,0,1)"
                value={values.color}
                onChange={onChange('color')}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.bold}
                    onChange={handleCheckboxChange('bold')}
                  />
                }
                label="Gras"
              />
            </Grid>

            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.italic}
                    onChange={handleCheckboxChange('italic')}
                  />
                }
                label="Italique"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.underline}
                    onChange={handleCheckboxChange('underline')}
                  />
                }
                label="Souligné"
              />
            </Grid>

            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.noMargin}
                    onChange={handleCheckboxChange('noMargin')}
                  />
                }
                label="Sans marge"
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle2"  style={{ marginTop: 16 }}>
            Casse du texte
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.uppercase}
                    onChange={handleCheckboxChange('uppercase')}
                  />
                }
                label="MAJUSCULES"
              />
            </Grid>

            <Grid item xs={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.lowercase}
                    onChange={handleCheckboxChange('lowercase')}
                  />
                }
                label="minuscules"
              />
            </Grid>

            <Grid item xs={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.capitalize}
                    onChange={handleCheckboxChange('capitalize')}
                  />
                }
                label="Capitalize"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Taille (rem)"
                type="number"
                value={values.fontSize || ''}
                onChange={onChange('fontSize')}
                InputProps={{ inputProps: { min: 0.5, max: 10, step: 0.1 } }}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Espacement lettres"
                value={values.letterSpacing}
                onChange={onChange('letterSpacing')}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Hauteur de ligne"
                value={values.lineHeight}
                onChange={onChange('lineHeight')}
              />
            </Grid>
          </Grid>
        </div>

        {/* SECTION STYLE DU SOUS-TITRE (uniquement si un sous-titre est présent) */}
        {values.subtitle && (
          <>
            <Divider  />
            <div >
              <Typography variant="h6" >
                Style du sous-titre
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl  fullWidth>
                    <InputLabel>Variante</InputLabel>
                    <Select
                      value={values.subtitleVariant}
                      onChange={onChange('subtitleVariant')}
                    >
                      <MenuItem value="subtitle1">Sous-titre 1</MenuItem>
                      <MenuItem value="subtitle2">Sous-titre 2</MenuItem>
                      <MenuItem value="body1">Corps de texte 1</MenuItem>
                      <MenuItem value="body2">Corps de texte 2</MenuItem>
                      <MenuItem value="caption">Légende</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Couleur"
                    placeholder="#000000 ou rgba(0,0,0,1)"
                    value={values.subtitleColor}
                    onChange={onChange('subtitleColor')}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.subtitleBold}
                        onChange={handleCheckboxChange('subtitleBold')}
                      />
                    }
                    label="Gras"
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.subtitleItalic}
                        onChange={handleCheckboxChange('subtitleItalic')}
                      />
                    }
                    label="Italique"
                  />
                </Grid>
              </Grid>

              <Typography variant="subtitle2"  style={{ marginTop: 16 }}>
                Casse du texte
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.subtitleUppercase}
                        onChange={handleCheckboxChange('subtitleUppercase')}
                      />
                    }
                    label="MAJUSCULES"
                  />
                </Grid>

                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.subtitleLowercase}
                        onChange={handleCheckboxChange('subtitleLowercase')}
                      />
                    }
                    label="minuscules"
                  />
                </Grid>

                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.subtitleCapitalize}
                        onChange={handleCheckboxChange('subtitleCapitalize')}
                      />
                    }
                    label="Capitalize"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label="Taille (rem)"
                    type="number"
                    value={values.subtitleFontSize || ''}
                    onChange={onChange('subtitleFontSize')}
                    InputProps={{ inputProps: { min: 0.5, max: 10, step: 0.1 } }}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    label="Espacement lettres"
                    value={values.subtitleLetterSpacing}
                    onChange={onChange('subtitleLetterSpacing')}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    label="Espacement (spacing)"
                    type="number"
                    value={values.subtitleSpacing}
                    onChange={onChange('subtitleSpacing')}
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                  />
                </Grid>
              </Grid>
            </div>
          </>
        )}
      </div>
    );
  }
});
