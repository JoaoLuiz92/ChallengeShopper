export interface Driver {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    rating: number;
    price_per_km: number;
    min_distance: number;
    value: number;
  }
  
  export interface RouteData {
    customer_id: string;
    origin: string;
    destination: string;
    distance: string;
    duration: string;
    start: [number, number];  
    end: [number, number];    
    path: [number, number][]; 
    options: Driver[];       
  }
  