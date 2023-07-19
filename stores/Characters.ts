import {AxiosResponse} from "axios";
import {ICharacter} from "~/types/Character";
export const useCharactersStore = defineStore('characters-store', {
    state: () => ({
        characters: [] as ICharacter[],
    }),
    actions: {
        async fetchCharacters() {
            try {
                const { data }: AxiosResponse<{ results: ICharacter[] }> = await useNuxtApp().$axios.get('/api/character');
                this.characters = data.results;
            } catch (error) {
                console.error(error);
            }
        },
    },
    persist: {
        storage: persistedState.localStorage
    }
});
