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
    CardCover: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    ShortDescription: Schema.Attribute.Text;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
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
      'dictionary.dictionary': DictionaryDictionary;
    }
  }
}
