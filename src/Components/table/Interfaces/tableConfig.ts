export interface tableConfig {
  expand: boolean; //Represents if the table can expands (The expanded table requires a lot more of data, so in addition to yours add those:
  //{..., cargo:,})
  inicialColumnPosToSort?: number; //Represent the wich column should sort the table first
  setStatusColorOrder?: string[]; //If the sort is a status, they are sorted by color, so you can manipulate it
  columns: Column[]; //Here you can set your columns
  actName?: string; //This is a column that represent actions in each line, you can change its name here
  actSvg?: string; //This is a column that represent actions in each line, you can change its icon here
  actions?: Action[]; //You can set the functions that each button in your line will represent
}

export interface Column {
  name: string; //Column name
  objName: string; //This is the name of the object you need to be shown in each cell
  type: string; //The type of the column, Text, number, link(The link need be bring like {href:"",text:""}), date, image(The image need be bring like {href:"",src:"",alt:""}), status (The status need be bring like {text:"text",color:"green|yellow|red|grey"})
  sort: boolean; //You can define if you can sort this collumn or not. It not work for images
  svg: string; //This is the icon thats is shown aside of the column name
}

interface Action {
  svg: string; //This is the icon that will represent the action in each line
  actFunction: Function; //This is the function that will be used if the button be clicked
  title: string; // The title that will be shown by hovering the icon
}
