import React, { useContext } from 'react';
import Blocks from '/imports/core/Blocks';
import { Typography, Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '/imports/ui/_providers/ContextProvider';

// Définition des styles personnalisés pour le bloc de titre
const useStyles = makeStyles(theme => ({
  titleContainer: props => ({
    textAlign: props.alignment || 'center',
    padding: theme.spacing(props.spacing || 2, 0),
    maxWidth: props.fullWidth ? '100%' : undefined,
    margin: theme.spacing(props.blockSpacing || 2, 0),
  }),
  title: props => ({
    fontWeight: props.bold ? (props.boldWeight || 'bold') : 'normal',
    color: props.color || (props.primaryColor || theme.palette.primary.main),
    textTransform: props.uppercase ? 'uppercase' : props.lowercase ? 'lowercase' : props.capitalize ? 'capitalize' : 'none',
    letterSpacing: props.letterSpacing || 'normal',
    lineHeight: props.lineHeight || 'normal',
    marginBottom: props.noMargin ? 0 : theme.spacing(props.subtitle ? 1 : 2),
    fontStyle: props.italic ? 'italic' : 'normal',
    textDecoration: props.underline ? 'underline' : 'none',
    fontSize: props.fontSize 
      ? `${props.fontSize}rem` 
      : props.baseTextSize && props.headerScale && props.variant === 'h1'
        ? `${props.baseTextSize * Math.pow(props.headerScale, 5)}px` 
        : props.baseTextSize && props.headerScale && props.variant === 'h2'
        ? `${props.baseTextSize * Math.pow(props.headerScale, 4)}px`
        : props.baseTextSize && props.headerScale && props.variant === 'h3'
        ? `${props.baseTextSize * Math.pow(props.headerScale, 3)}px`
        : props.baseTextSize && props.headerScale && props.variant === 'h4'
        ? `${props.baseTextSize * Math.pow(props.headerScale, 2)}px`
        : props.baseTextSize && props.headerScale && props.variant === 'h5'
        ? `${props.baseTextSize * props.headerScale}px`
        : props.baseTextSize && props.variant === 'h6'
        ? `${props.baseTextSize}px`
        : undefined,
    fontFamily: props.headingFontFamily || theme.typography[props.variant || 'h2'].fontFamily || theme.typography.fontFamily,
    // Animation responsive si activée
    transition: props.useAnimations ? theme.transitions.create(['transform', 'color']) : 'none',
    '&:hover': props.useAnimations ? {
      color: props.color 
        ? adjustColor(props.color, -15) 
        : props.primaryColor
          ? adjustColor(props.primaryColor, -15)
          : theme.palette.primary.dark,
    } : {},
  }),
  subtitle: props => ({
    marginTop: theme.spacing(props.subtitleSpacing || 1),
    color: props.subtitleColor || (props.secondaryColor || theme.palette.text.secondary),
    fontWeight: props.subtitleBold ? 'bold' : 'normal',
    fontStyle: props.subtitleItalic ? 'italic' : 'normal',
    textTransform: props.subtitleUppercase ? 'uppercase' : props.subtitleLowercase ? 'lowercase' : props.subtitleCapitalize ? 'capitalize' : 'none',
    letterSpacing: props.subtitleLetterSpacing || 'normal',
    fontSize: props.subtitleFontSize 
      ? `${props.subtitleFontSize}rem` 
      : props.baseTextSize && props.headerScale
        ? `${props.baseTextSize * props.headerScale * 0.8}px`
        : undefined,
    fontFamily: props.bodyFontFamily || theme.typography.body1.fontFamily || theme.typography.fontFamily,
  }),
  container: props => ({
    maxWidth: props.contentWidth || 'md',
  }),
}));

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

/**
 * Bloc de titre avec sous-titre optionnel
 * Offre de nombreuses options de personnalisation pour adapter le rendu à tous les besoins
 */
Blocks.register('TitleBlock', ({ block }) => {
  // Récupération des propriétés du bloc avec valeurs par défaut
  const {
    // Contenu
    title = 'Titre par défaut',
    subtitle = '',
    
    // Mise en page
    alignment = 'center',            // Options: 'left', 'center', 'right'
    maxWidth = 'md',                // Options: 'xs', 'sm', 'md', 'lg', 'xl', false (pour 100%)
    fullWidth = false,              // True pour largeur complète
    spacing = 2,                    // Espacement autour du titre (en unités de theme spacing)
    
    // Style du titre
    variant = 'h2',                 // Variante Typography (h1-h6)
    component = 'h1',               // Élément HTML à utiliser
    color = '',                     // Couleur du texte
    bold = true,                    // Texte en gras
    boldWeight = 'bold',            // Poids de la police si bold est true
    italic = false,                 // Texte en italique
    underline = false,              // Texte souligné
    uppercase = false,              // Texte en majuscules
    lowercase = false,              // Texte en minuscules
    capitalize = false,             // Première lettre de chaque mot en majuscule
    letterSpacing = 'normal',       // Espacement des lettres
    lineHeight = 'normal',          // Hauteur de ligne
    fontSize = null,                // Taille de police personnalisée (en rem)
    noMargin = false,               // Supprime les marges par défaut
    
    // Style du sous-titre
    subtitleVariant = 'subtitle1',  // Variante Typography pour le sous-titre
    subtitleComponent = 'p',        // Élément HTML pour le sous-titre
    subtitleColor = '',             // Couleur du sous-titre
    subtitleBold = false,           // Sous-titre en gras
    subtitleItalic = false,         // Sous-titre en italique
    subtitleUppercase = false,      // Sous-titre en majuscules
    subtitleLowercase = false,      // Sous-titre en minuscules 
    subtitleCapitalize = false,     // Première lettre de chaque mot en majuscule pour le sous-titre
    subtitleLetterSpacing = 'normal', // Espacement des lettres du sous-titre
    subtitleSpacing = 1,            // Espacement entre titre et sous-titre
    subtitleFontSize = null,        // Taille de police personnalisée pour le sous-titre (en rem)
  } = block;

  // Accès au contexte pour récupérer les paramètres visuels
  const { context } = useContext(Context);
  
  // Extraction des propriétés du thème
  const themeProps = context && context.theme 
    ? {
        // Couleurs
        primaryColor: context.theme.palette && context.theme.palette.primary && context.theme.palette.primary.main,
        secondaryColor: context.theme.palette && context.theme.palette.secondary && context.theme.palette.secondary.main,
        
        // Typographie
        headingFontFamily: context.theme.typography && context.theme.typography.h1 && context.theme.typography.h1.fontFamily,
        bodyFontFamily: context.theme.typography && context.theme.typography.fontFamily,
        baseTextSize: context.theme.typography && context.theme.typography.fontSize,
        headerScale: 1.2, // Valeur par défaut
        
        // Mise en page
        contentWidth: context.theme.props && context.theme.props.MuiContainer && context.theme.props.MuiContainer.maxWidth,
        blockSpacing: context.theme.custom && context.theme.custom.blockSpacing,
        
        // Options avancées
        useAnimations: context.theme.custom && context.theme.custom.useAnimations !== undefined 
          ? context.theme.custom.useAnimations 
          : true,
      }
    : {};

  // Application des styles avec toutes les propriétés
  const styleProps = { 
    ...themeProps,
    alignment, 
    color, 
    bold, 
    boldWeight, 
    uppercase, 
    lowercase, 
    capitalize,
    letterSpacing, 
    lineHeight, 
    noMargin, 
    italic, 
    underline, 
    fontSize,
    subtitle: !!subtitle, 
    subtitleColor, 
    subtitleBold, 
    subtitleItalic,
    subtitleUppercase, 
    subtitleLowercase, 
    subtitleCapitalize, 
    subtitleLetterSpacing, 
    subtitleSpacing, 
    subtitleFontSize,
    spacing, 
    fullWidth,
    variant,
  };
  
  const classes = useStyles(styleProps);

  // Rendu du composant avec Container optionnel pour contrôler la largeur
  return (
    <Container 
      className={classes.container}
      maxWidth={maxWidth && !fullWidth ? maxWidth : false}
      disableGutters={fullWidth}
    >
      <Box className={classes.titleContainer}>
        <Typography 
          variant={variant} 
          component={component} 
          className={classes.title}
        >
          {title}
        </Typography>
        
        {subtitle && (
          <Typography 
            variant={subtitleVariant}
            component={subtitleComponent}
            className={classes.subtitle}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Container>
  );
});
