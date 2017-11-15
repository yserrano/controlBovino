export class bovino {
  _id?: string;
  identificador: string;
  edad: string;
  peso: string;
  enfermedad: {
    edadEnfermedad: string;
    pesoEnfermedad: string;
  };
  tratamiento: {
    vacuna: string;
    fechaVacuna: string;
  }
  
}