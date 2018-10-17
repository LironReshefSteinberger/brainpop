import SchoolClassService from '../services/SchoolClassService.js'
import StudentService from '../services/StudentService.js'
import UtilService from '../services/UtilService.js'
import store from './store.js';


export default {
    state: {
        schoolClasses: [], 
        schoolClass: null, 
    },
    mutations: {
        setSchoolClasses(state, { schoolClasses }) {
            state.schoolClasses = schoolClasses;
        },
        setSchoolClass(state, payload) {          
            state.schoolClass = state.schoolClasses.find(schoolClass => schoolClass.name === payload.schoolClassName);
            StudentService.saveCurrState(state.schoolClass, null, null);
        },
    },
    getters: {
        schoolClassesForDisplay(state) {
            return state.schoolClasses;
        },  
        schoolClass(state) {
            return state.schoolClass;
        },  
    },
    actions: {
        loadSchoolClasses(context) {
            return SchoolClassService.getSchoolClasses()
                .then(schoolClasses => {
                    context.commit({ type: 'setSchoolClasses', schoolClasses })
                    return schoolClasses;
                })
        },
        setSchoolClass(context, { schoolClassName }) {            
            context.commit({ type: 'setSchoolClass', schoolClassName })
            SchoolClassService.setSchoolClass(schoolClassName);
        },
    }
};





