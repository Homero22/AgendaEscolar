export interface ShowLoguinModel {
  status: boolean;
  message: string;
  body: LoguinModel;
}
export interface LoguinModel {
    email: string;
    password: string;
}
