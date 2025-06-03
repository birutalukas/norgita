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

export interface ContentSchedule extends Struct.ComponentSchema {
  collectionName: 'components_content_schedules';
  info: {
    displayName: 'Schedule';
    icon: 'connector';
  };
  attributes: {
    CourseEndDate: Schema.Attribute.Date;
    CourseEndTime: Schema.Attribute.Time;
    CourseStartDate: Schema.Attribute.Date;
    CourseStartTime: Schema.Attribute.Time;
    Friday: Schema.Attribute.Boolean;
    Level: Schema.Attribute.Enumeration<
      ['A1.1', 'A1.2', 'A2.1', 'A2.2', 'B1.1', 'B1.2', 'B2.1', 'B2.2']
    >;
    Monday: Schema.Attribute.Boolean;
    Price: Schema.Attribute.Integer;
    Saturday: Schema.Attribute.Boolean;
    Sunday: Schema.Attribute.Boolean;
    Thursday: Schema.Attribute.Boolean;
    TimeTotal: Schema.Attribute.String;
    Tuesday: Schema.Attribute.Boolean;
    Wednesday: Schema.Attribute.Boolean;
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
      'content.schedule': ContentSchedule;
      'dictionary.dictionary': DictionaryDictionary;
    }
  }
}
