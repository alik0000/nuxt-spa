import {AxiosResponse} from "axios";
import {ICharacter} from "~/types/Character";

export const useCharacters = () => {
    const appNuxt = useNuxtApp()
    const characters = ref<ICharacter[]>([]);
    const filteredCharacters = ref<ICharacter[]>([]);
    const searchInput = ref<string>('');
    const selectedStatus = ref<string>('');

    async function fetchCharacters() {
        try {
            const { data }: AxiosResponse<{ results: ICharacter[] }> = await appNuxt.$axios.get('/api/character');
            characters.value = data.results;
        } catch (error) {
            console.error(error);
        }

        updateFilteredCharacters();
    }

    function updateFilteredCharacters() {
        filteredCharacters.value = characters.value.filter(character => {
            const isNameMatch = character.name.toLowerCase().includes(searchInput.value.toLowerCase());
            const isStatusMatch = !selectedStatus.value || character.status === selectedStatus.value;
            return isNameMatch && isStatusMatch;
        });
    }

    return {
        characters,
        filteredCharacters,
        searchInput,
        selectedStatus,
        fetchCharacters,
        updateFilteredCharacters,
    };
}
