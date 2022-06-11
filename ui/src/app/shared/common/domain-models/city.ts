import { Coordinate } from "./coordinate";
import { Weather } from "./weather";

export interface City {
    Name: string;
    Coordinates: Coordinate;
    Weather: Weather
    Bookmarked: boolean;
}
