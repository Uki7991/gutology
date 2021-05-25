<template>
    <div class="flex flex-col">
        <input class="p-3" @input="e=>inputData = e.target.value" :type="computedType">
        <button class="next-btn mt-4" @click="$emit('next')" :disabled="inputData === ''">Next</button>
    </div>
</template>

<script>
export default {
    model: {
        prop: 'answer',
        event: 'change',
    },
    props: {
        answer: {
            type: String,
        },
        type: {
            requred: true,
            type: String,
        }
    },
    data() {
        return {
            inputData: '',
        }
    },
    watch: {
        inputData(newVal) {
            this.$emit('change', newVal);
        }
    },
    computed: {
        computedType() {
            if (this.type === 'Email') {
                return 'email';
            } else if (this.type === 'Input') {
                return 'text';
            }
        }
    }
}
</script>