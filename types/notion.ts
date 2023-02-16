type TextType = {
    annotations: {
      bold: boolean;
      code: boolean;
      color: string;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
    };
    href: null;
    plain_text: string;
    text: { content: string; link: null };
    type: string;
}

type TitleParamType = {
  id:string,
  title:TextType[],
  type: string,
}

type TextParamType = {
  id: string;
  rich_text: TextType[];
  type: string;
};

type DateParamType = {
  date: { start: string; end: null; time_zone: null };
  id: string;
  type: string;
};

type CheckBoxParamType = {
  checkbox: boolean,
  id: string,
  type: string,
};

type FileParamType = { files: string[]; id: string; type: string };

type MultiSelectParamType = {
  id:string,
  multi_select:{color:string,id:string,name:string}[],
  type:string,
};

export type PostType = {
  archived: boolean;
  cover: null;
  created_by: { id: string; object: string };
  icon: null;
  id: string;
  last_edited_by: { object: string; id: string };
  last_edited_time: string;
  object: string;
  parent: { type: string; database_id: string };
  properties: {
    "Cover Image":FileParamType ;
    Date: DateParamType;
    Description: TextParamType;
    Post: TitleParamType, 
    Published:CheckBoxParamType,
    Slug: TextParamType,
    Tag: MultiSelectParamType;
  };
  url:string,
};

export type NotionPropsType = { posts: PostType[] };
