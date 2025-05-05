# Documentation du bloc Title

Le bloc Title (`TitleBlock`) est un composant utilisé pour afficher un titre et un sous-titre optionnel avec une grande variété d'options de personnalisation.

## Utilisation de base

```jsx
const titleBlock = {
  name: 'TitleBlock',
  title: 'Mon titre',
  subtitle: 'Mon sous-titre', // Optionnel
  alignment: 'center', // 'left', 'center', 'right'
  variant: 'h2', // Variante Typography: 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
};
```

## Propriétés disponibles

### Mise en page
| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `alignment` | string | 'center' | Alignement du texte: 'left', 'center', 'right' |
| `maxWidth` | string/boolean | 'md' | Largeur maximale: 'xs', 'sm', 'md', 'lg', 'xl', false (pour 100%) |
| `fullWidth` | boolean | false | Si true, occupe 100% de la largeur disponible |
| `spacing` | number | 2 | Espacement autour du titre (en unités theme spacing) |

### Contenu
| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `title` | string | 'Titre par défaut' | Texte du titre principal |
| `subtitle` | string | '' | Texte du sous-titre (optionnel) |

### Style du titre
| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `variant` | string | 'h2' | Variante Typography (h1-h6) |
| `component` | string | 'h1' | Élément HTML utilisé pour le rendu |
| `color` | string | '' | Couleur du texte |
| `bold` | boolean | true | Texte en gras |
| `boldWeight` | string | 'bold' | Poids de la police si bold est true |
| `italic` | boolean | false | Texte en italique |
| `underline` | boolean | false | Texte souligné |
| `uppercase` | boolean | false | Texte en majuscules |
| `lowercase` | boolean | false | Texte en minuscules |
| `capitalize` | boolean | false | Première lettre de chaque mot en majuscule |
| `letterSpacing` | string | 'normal' | Espacement des lettres |
| `lineHeight` | string | 'normal' | Hauteur de ligne |
| `fontSize` | number | null | Taille de police personnalisée (en rem) |
| `noMargin` | boolean | false | Supprime les marges par défaut |

### Style du sous-titre
| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `subtitleVariant` | string | 'subtitle1' | Variante Typography pour le sous-titre |
| `subtitleComponent` | string | 'p' | Élément HTML pour le sous-titre |
| `subtitleColor` | string | '' | Couleur du sous-titre |
| `subtitleBold` | boolean | false | Sous-titre en gras |
| `subtitleItalic` | boolean | false | Sous-titre en italique |
| `subtitleUppercase` | boolean | false | Sous-titre en majuscules |
| `subtitleLowercase` | boolean | false | Sous-titre en minuscules |
| `subtitleCapitalize` | boolean | false | Première lettre de chaque mot en majuscule |
| `subtitleLetterSpacing` | string | 'normal' | Espacement des lettres du sous-titre |
| `subtitleSpacing` | number | 1 | Espacement entre titre et sous-titre |
| `subtitleFontSize` | number | null | Taille de police personnalisée pour le sous-titre (en rem) |

## Exemples d'utilisation

### Titre centré avec sous-titre

```jsx
const titleBlock = {
  name: 'TitleBlock',
  title: 'Bienvenue sur notre site',
  subtitle: 'Découvrez tous nos produits et services',
  alignment: 'center',
  variant: 'h1',
  color: '#3f51b5', // Couleur primaire
  subtitleColor: '#757575', // Gris
};
```

### Titre en majuscules avec espacement des lettres

```jsx
const titleBlock = {
  name: 'TitleBlock',
  title: 'Nouveautés',
  alignment: 'left',
  variant: 'h2',
  uppercase: true,
  letterSpacing: '0.15em',
  bold: true,
  color: '#f50057', // Couleur d'accent
  noMargin: true,
};
```

### Titre personnalisé avec sous-titre élaboré

```jsx
const titleBlock = {
  name: 'TitleBlock',
  title: 'Notre histoire',
  subtitle: 'Le parcours d\'une entreprise familiale depuis 1965',
  alignment: 'center',
  variant: 'h3',
  component: 'h2',
  maxWidth: 'sm',
  bold: true,
  uppercase: false,
  letterSpacing: '0.05em',
  subtitleItalic: true,
  subtitleColor: '#607d8b',
  subtitleSpacing: 2,
};
```
