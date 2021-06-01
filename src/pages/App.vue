<template>
    <div class="container mx-auto">
        <div v-if="loading">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="211px" height="211px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#4996a2" stroke-width="7" r="21" stroke-dasharray="98.96016858807849 34.98672286269283">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.9615384615384615s" values="0 50 50;360 50 50" keyTimes="0;1"/>
                </circle>
            </svg>
        </div>
        <div v-else class="flex flex-row mt-12">
            <div class="lg:w-8/12 w-full">
                <splide ref="splide" :slides="questions" :options="options">
                    <splide-slide v-for="(question, index) in questions" :key="question.id">
                        <div class="flex flex-col">
                            <p class="text-xl text-black font-bold mb-11">{{ question.fields.question }}</p>
                            <selectable v-if="question.fields.type === 'Select'" :last="(index + 1) == questions.length" :index="index + 1" @back="back" @next="next" v-model="question.fields.answer" :options="question.fields.answers"></selectable>
                            <inputable v-if="question.fields.type === 'Input' || question.fields.type === 'Email'" :last="(index + 1) == questions.length" :index="index + 1" @back="back" @next="next" :type="question.fields.type" v-model="question.fields.answer"></inputable>
                            <checkable v-if="question.fields.type === 'Checkbox'" :last="(index + 1) == questions.length" :index="index + 1" @back="back" @next="next" :id="question.id" :options="question.fields.answers" v-model="question.fields.answer"></checkable>
                            <radioable v-if="question.fields.type === 'Radio'" :last="(index + 1) == questions.length" :index="index + 1" @back="back" @next="next" :id="question.id" :options="question.fields.answers" v-model="question.fields.answer"></radioable>
                            <button v-if="(index + 1) == questions.length" class="next-btn" @click="submit">Submit</button>
                        </div>
                    </splide-slide>
                </splide>
            </div>
            <div class="lg:w-4/12 w-full"></div>
        </div>
    </div>
</template>

<script>
import Inputable from '../components/Inputable.vue';
import Selectable from "../components/Selectable";
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import Checkable from '../components/Checkable.vue';
import Radioable from '../components/Radioable.vue';
import {questionBase, answersBase} from "../credentials.config";

export default {
    components: {
        Selectable,
        Inputable,
        Checkable,
        Radioable
    },
    data() {
        return {
            questions: [],
            loading: false,
            page: 1,
            options: {
                perPage: 1,
                gap: '1em',
                padding: '1em',
                arrows: false,
                pagination: false,
                drag: false,
            }
        }
    },
    watch: {
        questions: function (newVal) {
        }
    },
    methods: {
        next() {
            this.$refs.splide.go('+');
        },
        back() {
            this.$refs.splide.go('-');
        },
        async submit() {
            let fields = {};
            
            this.questions.forEach(item => {
                fields[item.fields.question] = item.fields.answer;
            })

            await this.$axios.post(questionBase + '/Users', {
                fields: fields,
                typecast: true,
            }).then(data => {
                alert('success');
            }).catch(data => {
                alert('error');
            })
        }
    },
    async created() {
        this.loading = true;

        await this.$axios.get(questionBase + '/Questions?sort[0][field]=position&sort[0][direction]=asc&filterByFormula={active}=1')
            .then(data => {
                this.questions = data.data.records
            });

        for (let item of this.questions) {
            const answers = item.fields.Answers;
            item.fields.answer = '';

            item.fields.answers = [];
            if (answers) {
                await answers.forEach( answer => {
                     this.$axios.get(questionBase + '/Answers/' + answer)
                        .then(data => {
                            item.fields.answers.push({
                                id: data.data.id,
                                answer: data.data.fields.answer,
                            });
                        })
                })
            }
            const type = item.fields.type[0]
            if (type) {
                item.fields.type = '';
                await this.$axios.get(questionBase + '/Types/' + type)
                    .then(data => {
                        item.fields.type = data.data.fields.name
                    })
            }
        }

        this.loading = false;

    },
}
</script>