import { useState, useEffect  } from 'react'
import './Form.module.css'

const Form = () => {
    const [altura, setAltura] = useState('')
    const [peso, setPeso] = useState('')
    const [resultado, setResultado] = useState(null)
    const [classificacao, setClassificacao] = useState('');

    const calcularIMC = (event) => {
        event.preventDefault()

        const alturaNumero = parseFloat(altura);
        const pesoNumero = parseFloat(peso);

        if (isNaN(alturaNumero) || isNaN(pesoNumero)) {
            alert('Confira se os dados foram inseridos corretamente');
            return;
        }

        const imc = ((pesoNumero / (alturaNumero ** 2))* 10000)
        setResultado(imc)
    }

    useEffect(() => {
        setClassificacao(
            resultado !== null
                ? resultado < 18.5
                    ? 'Magreza'
                    : resultado < 24.9
                    ? 'Normal'
                    : resultado < 29.9
                    ? 'Sobrepeso'
                    : resultado < 34.9
                    ? 'Obesidade Grau I'
                    : resultado < 39.9
                    ? 'Obesidade Grau II'
                    : 'Obesidade Grau III'
                : ''
        );
    }, [resultado]);

    return (
        <div  className="container">
            <form onSubmit={calcularIMC}>
                <div className="inputContainer">
                    <label>
                        <h4>altura:</h4>
                        <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} />
                        cm
                    </label>
                    <label>
                        <h4>peso:</h4>
                        <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)}/>
                        kg
                    </label>
                </div>
                <button type='submit'>Calcular</button>
                {resultado !== null && (
                    <div className='resultContainer'>
                        <h2>Resultado:</h2>
                        <p><span>IMC:</span> {resultado.toFixed(2)}</p>
                        <p><span>Classificação:</span> {classificacao}</p>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Form