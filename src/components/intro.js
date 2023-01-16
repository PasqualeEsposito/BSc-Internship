import abs from "./../images/abstract.jpg";
import first from "./../images/crea.png";
import second from "./../images/file.png";
import {Component} from "react";
import { Carousel } from 'react-bootstrap';

class Intro extends Component {

    render() {
        return (
            <>
                <Carousel style={{margin: 'auto', width: '70%', padding: '1%'}} interval={10000}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={abs}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Verifica la sicurezza di applet IFTTT</h3>
                            <p>Su questo sito potrai verificare l’efficacia di applet IFTTT.
                                IFTTT è l’acronimo di “If this then that” ed un'applet è composta da un “trigger” e un “action”: se si verifica il “trigger” allora esegui l’“action”.
                                Questo sito permette di controllare il livello di sicurezza di un’applet o un file di applet.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={first}
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3 className='text-dark'>Crea una regola</h3>
                            <p className='text-dark'>In questa sezione potrai creare una regola e verificarne la sicurezza. Il livello di sicurezza viene calcolato in base a quattro classi: “Harmless”, “Physical attack”, “Cybersecurity attack”, “Personal attack”.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={second}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3 className='text-dark'>Carica un file di regole</h3>
                            <p className='text-dark'>In questa sezione potrai caricare un file json contenente tutte le regole da te create e verificarne la sicurezza, filtrandole in base alle tue esigenze.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </>
        );
    }
}

export default Intro;