import type { Schema, Struct } from '@strapi/strapi';

export interface CardsCardInfo extends Struct.ComponentSchema {
  collectionName: 'components_cards_card_infos';
  info: {
    description: '';
    displayName: 'CardInfo';
    icon: 'crop';
  };
  attributes: {
    ButtonTitle: Schema.Attribute.String;
    ShortDescription: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface ContentAccordion extends Struct.ComponentSchema {
  collectionName: 'components_content_accordions';
  info: {
    displayName: 'Accordion';
    icon: 'bulletList';
  };
  attributes: {
    Content: Schema.Attribute.Blocks;
    Title: Schema.Attribute.String;
  };
}

export interface DictionaryDictionary extends Struct.ComponentSchema {
  collectionName: 'components_dictionary_dictionaries';
  info: {
    displayName: 'Dictionary';
    icon: 'discuss';
  };
  attributes: {
    Translation: Schema.Attribute.String;
    TranslationAudio: Schema.Attribute.Media<'files' | 'audios'>;
    Word: Schema.Attribute.String;
    WordAudio: Schema.Attribute.Media<'files' | 'audios'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cards.card-info': CardsCardInfo;
      'content.accordion': ContentAccordion;
      'dictionary.dictionary': DictionaryDictionary;
    }
  }
}
