import { create } from 'zustand'

export type User = {

    name: string,
    peso: string,
    altura: string,
    idade: string,
    sexo: string,
    nivel: string,
    objetivo: string,
}

type DataState = {
    user : User
    setPageOne: (data : Omit<User, 'sexo' | 'nivel' | 'objetivo'>) => void;
    setPageTwo: (data : Pick<User, 'sexo' | 'nivel' | 'objetivo'>) => void;
}

export const useDataStore = create<DataState>((set) => ({
    user: {
        name: '',
        peso: '',
        altura: '',
        idade: '',
        sexo: '',
        nivel: '',
        objetivo: '',
    },
 setPageOne : (data) => set((state) => ({user: {...state.user, ...data}})),
 setPageTwo : (data) => set((state) => ({user: {...state.user, ...data}})),
}))