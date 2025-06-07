export type BinType = {
  _id: string;
  binId: string;
  location: {
    lat: number;
    lon: number;
    address: string,
  };
  placementDate: string;
  lastEmptiedAt: string;
  status: string; // e.g. "active", "full", "offline"
  fillLevel: string; // e.g. "empty", "half", "full"
};
