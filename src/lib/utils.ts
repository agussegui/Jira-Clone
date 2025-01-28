import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateInviteCode(length: number){
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for(let i = 0; i < length; i++){
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result;
}


export function snakeCasetoTitleCase(str: string){
  return 
    str.toLowerCase() // Convierte toda la cadena a minúsculas.
    .replace(/_/g, " ")  // Reemplaza todos los guiones bajos (_) por espacios.
    .replace(/\b\w/g, (char) => char.toUpperCase()) // Convierte la primera letra de cada palabra a mayúscula.
}