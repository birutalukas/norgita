import type { Schema, Struct } from '@strapi/strapi';

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
      'dictionary.dictionary': DictionaryDictionary;
    }
  }
}
