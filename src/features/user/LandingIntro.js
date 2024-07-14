import TemplatePointers from "./components/TemplatePointers"

const bgWelcome = require('../../assets/main.jpeg');

function LandingIntro() {

  return (
    <div className="hero min-h-full rounded-l-xl">
      <div className="hero-content">
        <div className="text-center mt-0"><img src={bgWelcome} alt="Dashwind Admin Template" className="w-100 inline-block"></img></div>
      </div>
    </div>
  )

}

export default LandingIntro