export interface CuisineType {
  Id: number;
  Name: string
}

export interface Restaurant {
  Id: string
  Name: string;
  LogoUrl: string;
  IsOpenNow: boolean;
  Rating: {
    Count: number;
    Average: number;
    StarRating: number
  };
  CuisineTypes: CuisineType[]
}
