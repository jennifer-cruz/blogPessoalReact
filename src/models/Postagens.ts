import Temas from './Temas'

interface Postagens {
    id: number;
    titulo: string;
    texto: string;
    tema?: Temas| null
    }

export default Postagens;