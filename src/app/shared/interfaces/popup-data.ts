export interface PopupData {
  message: string;
  firstButton: string;
  secondButton: string;
  confirmed?: Function;
  canceled?: Function;
}
