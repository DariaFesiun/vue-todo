<script>
export default {
  name: 'TodoItem',
  props: {
    todo: Object,
  },
  emits: ['update', 'delete'],
  data() {
    return {
      editing: false,
      newTitle: this.todo.title,
    };
  },
  methods: {
    toggle() {
      this.$emit('update', {
        ...this.todo,
        completed: !this.todo.completed,
      });
    },
    rename() {
      if (!this.editing) {
        return;
      } //якщо не відбувається редаг. то нічого не робимо

      this.editing = false; //інакше закриваємо редагування

      if (this.newTitle === this.todo.title) {
        return;
      } //якщо тайтл не змінився - не робимо нічого

      if (this.newtitle === '') {
        this.remove();

        return;
      } //якщо тайтл порожній - видаляємо елемент

      this.$emit('update', {
        ...this.todo,
        title: this.newTitle,
      }); //якщо тайтл змінився, то зберігаємо зміни

      this.newTitle = ''; //очищуємо форму
    },
    remove() {
      this.$emit('delete');
    },
    edit() {
      this.newTitle = this.todo.title;
      this.editing = true;

      this.$nextTick(() => {
        this.$refs['title-field'].focus();
      });
    }
  },
};
</script>

<template>
  <div class="todo" :class="{ completed: todo.completed }">
    <label class="todo__status-label">
      <input 
        type="checkbox" 
        class="todo__status" 
        :checked="todo.completed"
        @change="toggle"
      />
    </label>

    <form v-if="editing" @submit.prevent="rename">
      <input
        type="text"
        class="todo__title-field"
        placeholder="Empty todo will be deleted"
        v-model.trim="newTitle"
        ref="title-field"
        @keyup.esc="editing = false"
        @blur="rename"
      />
    </form>

    <template v-else>
      <span class="todo__title" @dblclick="edit">
        {{ todo.title }}
      </span>
      <button
        class="todo__remove"
        @click="remove"
      >
        ×
      </button>
    </template>

    <div class="modal overlay" :class="{ 'is-active': false }">
      <div class="modal-background has-background-white-ter"></div>
      <div class="loader"></div>
    </div>
  </div>
</template>

<style></style>
