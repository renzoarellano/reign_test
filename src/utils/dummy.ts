import ReactIcon from "../assets/images/react.png"
import AngularIcon from "../assets/images/angular.png"
import VueIcon from "../assets/images/vue.png"

const SELECT_OPTIONS = [
    { 
        value: "",
        label: "Select your news",
    },
    { 
        value: "reactjs",
        label: "ReactJS",
        icon: ReactIcon,
    },
    { 
        value: "angular",
        label: "AngularJS",
        icon: AngularIcon,
    },
    { 
        value: "vuejs",
        label: "VueJS",
        icon: VueIcon,
    }    
]

export { SELECT_OPTIONS }