export interface ModelsAttribute {
  relatedObjectId: any;
  attributeName: string;
  attributeValue: string;
}

export class Attribute {

  constructor(public relatedObjectId: any, public attributeName: string, public attributeValue: string) {

  }
}
