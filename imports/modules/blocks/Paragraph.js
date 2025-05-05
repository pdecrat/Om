import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Blocks from '/imports/core/Blocks';
import { Context } from '/imports/ui/_providers/ContextProvider';

// Création d'un hook de style qui accepte les props de thème personnalisé
const useStyles = makeStyles(theme => ({
  paragraph: props => ({
    fontFamily: props.bodyFontFamily || theme.typography.fontFamily,
    fontSize: props.fontSize ? `${props.fontSize}px` : theme.typography.body1.fontSize,
    color: props.textColor || theme.palette.text.primary,
    lineHeight: props.lineHeight || theme.typography.body1.lineHeight,
    textAlign: props.textAlign || 'left',
    margin: theme.spacing(props.blockSpacing || 2, 0),
    // Utilisation de props.spacing si disponible pour un espacement supplémentaire
    padding: theme.spacing(props.spacing ? props.spacing / 2 : 1, 0),
  }),
  container: props => ({
    // Utilisation des paramètres de largeur de contenu s'ils sont définis
    maxWidth: props.contentWidth || 'md',
  }),
}));

Blocks.register('Paragraph', ({ block: { text = 'Hello World!' } }) => {
  // Accès au contexte pour récupérer les paramètres visuels
  const { context } = useContext(Context);
  const themeProps = context && context.theme && context.theme.custom 
    ? {
        // Paramètres de texte
        bodyFontFamily: context.theme.typography && context.theme.typography.fontFamily,
        fontSize: context.theme.typography && context.theme.typography.fontSize,
        textColor: context.theme.palette && context.theme.palette.text && context.theme.palette.text.primary,
        
        // Paramètres de mise en page
        contentWidth: context.theme.props && context.theme.props.MuiContainer && context.theme.props.MuiContainer.maxWidth,
        blockSpacing: context.theme.custom.blockSpacing,
        spacing: context.theme.spacing && typeof context.theme.spacing === 'function' 
          ? 1 // On ne peut pas utiliser la fonction directement, donc on utilise une valeur par défaut
          : 1,
        
        // Autres paramètres personnalisés
        lineHeight: 1.6, // Valeur par défaut
        textAlign: 'left', // Valeur par défaut
      }
    : {};
  
  const classes = useStyles(themeProps);

  return (
    <Container className={classes.container}>
      <Typography className={classes.paragraph} variant="body1" component="p">
        {text}
      </Typography>
    </Container>
  );
});
