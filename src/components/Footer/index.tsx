import "./styles.scss";

const Footer = () => {
  return (
    <>
    <footer className="footer">
        <section className="footer__section">
            <div className="footer__content">
                <div className="footer__links">
                    <div className="">
                        <a className="footer__link">Copyright © 2025 Hound Express. Todos los derechos reservados.</a>
                    </div>
                    <div className="">
                        <a className="footer__link" target="_blank" href="terminos.html">Términos y condiciones</a>
                    </div>
                    <div className="">
                        <a className="footer__link" target="_blank" href="privacidad.html">Política de privacidad</a>
                    </div>
                </div>
            </div>
        </section>
    </footer>
    </>
  );
};

export default Footer;
