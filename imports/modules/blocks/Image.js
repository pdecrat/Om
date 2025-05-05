import React, { useContext } from 'react';
import { Parallax } from 'react-parallax';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';

import Blocks from '/imports/core/Blocks';
import { UIContext } from '/imports/ui/_providers/UIProvider';
import { Context } from '/imports/ui/_providers/ContextProvider';

// Styles personnalisés pour l'image
const useStyles = makeStyles(theme => ({
  imageContainer: props => ({
    // Utilisation de l'espacement personnalisé pour les marges
    margin: theme.spacing(props.blockSpacing || 2, 0),
    // Utilisation du border-radius personnalisé si disponible
    borderRadius: props.borderRadius ? `${props.borderRadius}px` : '0',
    overflow: 'hidden',
    // Utilisation des ombres personnalisées si activées
    boxShadow: props.useShadows ? theme.shadows[props.shadowIntensity || 3] : 'none',
    // Animation responsive si activée
    transition: props.useAnimations ? theme.transitions.create(['transform', 'box-shadow']) : 'none',
    '&:hover': props.useAnimations ? {
      transform: 'scale(1.01)',
      boxShadow: props.useShadows ? theme.shadows[Math.min((props.shadowIntensity || 3) + 2, 24)] : 'none',
    } : {},
  }),
  parallaxContent: props => ({
    // Hauteur adaptative en fonction de la taille d'écran si le mode responsive est activé
    height: props.useResponsiveLayout 
      ? 'calc(40vh + 150px)' // Hauteur responsive
      : '400px', // Hauteur fixe par défaut
  }),
  container: props => ({
    // Utilisation des paramètres de largeur de contenu s'ils sont définis
    maxWidth: props.contentWidth || 'md',
  }),
}));

Blocks.register('Image', ({ block: { imgUrl = 'https://source.unsplash.com/random/800x600' } }) => {
  const { isEdited } = useContext(UIContext);
  // Accès au contexte pour récupérer les paramètres visuels
  const { context } = useContext(Context);
  
  // Extraction des propriétés du thème
  const themeProps = context && context.theme 
    ? {
        // Paramètres de mise en page
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
        useResponsiveLayout: context.theme.custom && context.theme.custom.useResponsiveLayout !== undefined 
          ? context.theme.custom.useResponsiveLayout 
          : true,
      }
    : {};
  
  const classes = useStyles(themeProps);

  return (
    <Container className={classes.container}>
      <Box className={classes.imageContainer}>
        <Parallax
          bgImage={imgUrl}
          bgImageAlt="Image"
          strength={themeProps.useAnimations ? 300 : 0}
        >
          <div className={classes.parallaxContent} />
        </Parallax>
      </Box>
    </Container>
  );
});
