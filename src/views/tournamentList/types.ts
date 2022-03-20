export interface Tournament {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isFavorite: boolean;
  country: string;
  city: string;
  coverPhotoBase64: string;
  userId: number;
}
