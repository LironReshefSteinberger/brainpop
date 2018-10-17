import StudentService from '../services/StudentService.js'
import { stat } from 'fs';


export default {
    state: {
        students: [], 
        student: null, 
        studentInfo: null,
        studentsForCsv: [],
        filterBy: {
            name: '',
          },
        sortBy: {
            columnName: '',
            isAsc: false,
        }
    },
    mutations: {
        setStudents(state, { students }) {
            state.students = students;
        },
        setStudent(state, { student }) {
            state.student = student;
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
            StudentService.saveCurrState('', state.filterBy, null);
        },
        //update studentInfo in state.students and then update students in "data" in localStorage
        setStudentInfo(state, { studentInfo }) {
            var studentToUpdateIdx = state.students.findIndex(student => student.id === studentInfo.id);
            state.students.splice(studentToUpdateIdx, 1, studentInfo);
            StudentService.saveStudents(state.students);
        },
        setSortBy(state, payload) {
            state.sortBy = payload.sortBy;
            StudentService.saveCurrState('', null, state.sortBy);
        },
    },
    getters: {
        setFilter(state) {
            return state.filterBy;
        },
        setSort(state) {
            return state.sortBy;
        },
        studentsForDisplay(state, getters) {
            var students = getters.sortedStudents;
            var filter = state.filterBy.name.toLowerCase();
            var filteredStudents = students.filter(student => {
                let firstName = student.first_name.toLowerCase();
                let lastName = student.last_name.toLowerCase();
                return firstName.includes(filter) || lastName.includes(filter);
            })
            return filteredStudents;
        },
        sortedStudents(state) {
            var students = JSON.parse(JSON.stringify(state.students));
            students.sort((studentA, studentB) => {
                if (state.sortBy.columnName === 'firstName') {
                    var nameA = studentA.first_name.toUpperCase(); 
                    var nameB = studentB.first_name.toUpperCase();
                } else if (state.sortBy.columnName === 'lastName') {
                    var nameA = studentA.last_name.toUpperCase(); 
                    var nameB = studentB.last_name.toUpperCase();
                }
                if (nameA < nameB) {
                    if (state.sortBy.isAsc) return -1;
                    else return 1;
                } else if (nameA > nameB) {
                    if (state.sortBy.isAsc) return 1;
                    else return -1;
                }
                return 0;
            })
            return students;
        },
        studentsForCsv(state) {
            return state.studentsForCsv;
        },
    },
    actions: {
        loadStudents(context, payload) {
            return StudentService.getStudents(payload.schoolClass)
                .then(students => {
                    context.commit({ type: 'setStudents', students })
                    return students;
                })
        },
        getStudentInfoById(context, { studentId }) {
            
            return StudentService.getStudentInfoById(studentId)
                .then(studentInfo => {
                    context.commit({ type: 'setStudentInfo', studentInfo })
                    return studentInfo;
            })
        },
        saveStudentInfo(context, { savedStudentInfo }) {
            context.commit({ type: 'saveStudentInfo', savedStudentInfo })
        },
    }
};





