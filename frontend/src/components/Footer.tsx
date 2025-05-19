import rhidalgo from '../assets/rhidalgo.png';

const Footer = () =>{
    return(
        <footer className=" text-white py-4 mt-5" style={{backgroundColor:'#969696'}}>
            <div className="container text-center">
                <img src={rhidalgo} alt="Raldon Logo" title="Raldin Logo" height={100}/>
                <p className="mb-0">&copy; {new Date().getFullYear()} Product Review. </p>
            </div>
        </footer>
    )
}

export default Footer;