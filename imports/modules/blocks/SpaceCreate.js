import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Blocks from '/imports/core/Blocks';
import useCall from '/imports/ui/_hooks/useCall';
import { Context } from '/imports/ui/_providers/ContextProvider';

// Styles personnalisés pour le formulaire de création d'espace
const useStyles = makeStyles(theme => ({
  root: props => ({
    margin: theme.spacing(props.blockSpacing || 2, 0),
    padding: theme.spacing(3),
    borderRadius: props.borderRadius ? `${props.borderRadius}px` : theme.shape.borderRadius,
    // Utilisation des ombres personnalisées si activées
    boxShadow: props.useShadows ? theme.shadows[props.shadowIntensity || 3] : 'none',
    // Animation responsive si activée
    transition: props.useAnimations ? theme.transitions.create(['transform', 'box-shadow']) : 'none',
    '&:hover': props.useAnimations ? {
      boxShadow: props.useShadows ? theme.shadows[Math.min((props.shadowIntensity || 3) + 1, 24)] : 'none',
    } : {},
    // Utilisation des couleurs du thème
    backgroundColor: props.backgroundColor || theme.palette.background.paper,
  }),
  title: props => ({
    marginBottom: theme.spacing(2),
    color: props.primaryColor || theme.palette.primary.main,
    fontFamily: props.headingFontFamily || theme.typography.h6.fontFamily,
  }),
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  textField: props => ({
    marginBottom: theme.spacing(2),
    '& .MuiInputBase-input': {
      fontFamily: props.bodyFontFamily || theme.typography.body1.fontFamily,
      fontSize: props.fontSize ? `${props.fontSize}px` : theme.typography.body1.fontSize,
    },
    '& .MuiInputLabel-root': {
      fontFamily: props.bodyFontFamily || theme.typography.body1.fontFamily,
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: props.primaryColor || theme.palette.primary.main,
      }
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: props.primaryColor || theme.palette.primary.main,
    }
  }),
  button: props => ({
    marginTop: theme.spacing(1),
    backgroundColor: props.primaryColor || theme.palette.primary.main,
    color: props.primaryColor ? (isLightColor(props.primaryColor) ? '#000000' : '#ffffff') : theme.palette.primary.contrastText,
    fontFamily: props.bodyFontFamily || theme.typography.button.fontFamily,
    fontSize: props.fontSize ? `${parseInt(props.fontSize) * 0.875}px` : theme.typography.button.fontSize,
    '&:hover': {
      backgroundColor: props.primaryColor 
        ? adjustColor(props.primaryColor, -15) 
        : theme.palette.primary.dark,
    }
  }),
  container: props => ({
    maxWidth: props.contentWidth || 'sm',
  }),
}));

// Fonction pour déterminer si une couleur est claire ou foncée
const isLightColor = (color) => {
  // Version simple - une analyse précise nécessiterait de convertir en HSL
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
};

// Fonction pour ajuster la luminosité d'une couleur
const adjustColor = (color, amount) => {
  const hex = color.replace('#', '');
  let r = parseInt(hex.substr(0, 2), 16);
  let g = parseInt(hex.substr(2, 2), 16);
  let b = parseInt(hex.substr(4, 2), 16);

  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

Blocks.register('SpaceCreate', ({ block }) => {
  const [name, setName] = useState('');
  const call = useCall('createSpace');
  const history = useHistory();
  
  // Accès au contexte pour récupérer les paramètres visuels
  const { context } = useContext(Context);
  
  // Extraction des propriétés du thème
  const themeProps = context && context.theme 
    ? {
        // Couleurs
        primaryColor: context.theme.palette && context.theme.palette.primary && context.theme.palette.primary.main,
        backgroundColor: context.theme.palette && context.theme.palette.background && context.theme.palette.background.paper,
        
        // Typographie
        headingFontFamily: context.theme.typography && context.theme.typography.h6 && context.theme.typography.h6.fontFamily,
        bodyFontFamily: context.theme.typography && context.theme.typography.fontFamily,
        fontSize: context.theme.typography && context.theme.typography.fontSize,
        
        // Mise en page
        contentWidth: context.theme.props && context.theme.props.MuiContainer && context.theme.props.MuiContainer.maxWidth,
        blockSpacing: context.theme.custom && context.theme.custom.blockSpacing,
        borderRadius: context.theme.shape && context.theme.shape.borderRadius,
        
        // Options avancées
        useShadows: context.theme.custom && context.theme.custom.useShadows !== undefined 
          ? context.theme.custom.useShadows 
          : true,
        shadowIntensity: context.theme.custom && context.theme.custom.shadowIntensity,
        useAnimations: context.theme.custom && context.theme.custom.useAnimations !== undefined 
          ? context.theme.custom.useAnimations 
          : true,
      }
    : {};
    
  const classes = useStyles(themeProps);

  const changeName = e => setName(e.target.value);
  const launchToSpace = () => {
    call({ name }, (err) => {
      if (!err)
        history.push('/s/' + encodeURI(name));
    });
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.root} elevation={0}>
        <Typography variant="h6" className={classes.title}>
          {block.fieldText || "Créer un nouvel espace"}
        </Typography>
        <form className={classes.form} onSubmit={(e) => { e.preventDefault(); launchToSpace(); }}>
          <TextField
            className={classes.textField}
            value={name}
            onChange={changeName}
            label={block.fieldText || "Nom de l'espace"}
            variant="outlined"
            fullWidth
            placeholder="Entrez un nom pour votre nouvel espace"
            required
          />
          <Button 
            className={classes.button}
            variant="contained" 
            color="primary"
            onClick={launchToSpace}
            fullWidth
            disabled={!name.trim()}
          >
            {block.buttonText || "Créer l'espace"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
});
