<template>
  <div class="container">
    <h1 class="my-4">Отслеживание грузов</h1>

    <!-- Форма для добавления груза -->
    <form @submit.prevent="addCargo" class="mb-4">
      <div class="row g-3">
        <div class="col-md-3">
          <label for="cargoName" class="form-label">Название груза</label>
          <input
            type="text"
            id="cargoName"
            v-model="newCargo.name"
            class="form-control"
            :class="{ 'is-invalid': errors.name }"
          />
          <div class="invalid-feedback" v-if="errors.name">Введите название груза.</div>
        </div>
        <div class="col-md-3">
          <label for="origin" class="form-label">Пункт отправления</label>
          <select
            id="origin"
            v-model="newCargo.origin"
            class="form-select"
            :class="{ 'is-invalid': errors.origin }"
          >
            <option value="" disabled>Выберите город</option>
            <option v-for="city in cities" :key="city">{{ city }}</option>
          </select>
          <div class="invalid-feedback" v-if="errors.origin">Выберите пункт отправления.</div>
        </div>
        <div class="col-md-3">
          <label for="destination" class="form-label">Пункт назначения</label>
          <select
            id="destination"
            v-model="newCargo.destination"
            class="form-select"
            :class="{ 'is-invalid': errors.destination }"
          >
            <option value="" disabled>Выберите город</option>
            <option v-for="city in cities" :key="city">{{ city }}</option>
          </select>
          <div class="invalid-feedback" v-if="errors.destination">Выберите пункт назначения.</div>
        </div>
        <div class="col-md-3">
          <label for="departureDate" class="form-label">Дата отправления</label>
          <input
            type="date"
            id="departureDate"
            v-model="newCargo.departureDate"
            class="form-control"
            :class="{ 'is-invalid': errors.departureDate }"
          />
          <div class="invalid-feedback" v-if="errors.departureDate">Введите корректную дату отправления.</div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary mt-3">Добавить груз</button>
    </form>

    <div class="mb-3">
      <label for="statusFilter" class="form-label">Фильтр по статусу</label>
      <select
        id="statusFilter"
        v-model="filterStatus"
        class="form-select"
      >
        <option value="">Все статусы</option>
        <option v-for="status in statuses" :key="status">{{ status }}</option>
      </select>
    </div>

    <table class="table table-bordered table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Статус</th>
        <th>Пункт отправления</th>
        <th>Пункт назначения</th>
        <th>Дата отправления</th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="cargo in filteredCargoList"
        :key="cargo.id"
        :class="statusClass(cargo.status)"
      >
        <td>{{ cargo.id }}</td>
        <td>{{ cargo.name }}</td>
        <td>
          <select
            v-model="cargo.status"
            @change="updateCargoStatus(cargo)"
            class="form-select"
          >
            <option v-for="status in statuses" :key="status">{{ status }}</option>
          </select>
        </td>
        <td>{{ cargo.origin }}</td>
        <td>{{ cargo.destination }}</td>
        <td>{{ cargo.departureDate }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const cargoList = ref([
  {
    id: 'CARGO001',
    name: 'Строительные материалы',
    status: 'В пути',
    origin: 'Москва',
    destination: 'Казань',
    departureDate: '2024-11-24',
  },
  {
    id: 'CARGO002',
    name: 'Хрупкий груз',
    status: 'Ожидает отправки',
    origin: 'Санкт-Петербург',
    destination: 'Екатеринбург',
    departureDate: '2024-11-26',
  },
]);

const cities = ['Москва', 'Казань', 'Санкт-Петербург', 'Екатеринбург'];
const statuses = ['Ожидает отправки', 'В пути', 'Доставлен'];

const newCargo = ref({
  name: '',
  origin: '',
  destination: '',
  departureDate: '',
  status: 'Ожидает отправки',
});

const errors = ref({
  name: false,
  origin: false,
  destination: false,
  departureDate: false,
});

const filterStatus = ref('');

const addCargo = () => {
  errors.value.name = !newCargo.value.name;
  errors.value.origin = !newCargo.value.origin;
  errors.value.destination = !newCargo.value.destination;
  errors.value.departureDate = !newCargo.value.departureDate;

  if (Object.values(errors.value).some((e) => e)) return;

  const id = `CARGO${String(cargoList.value.length + 1).padStart(3, '0')}`;
  cargoList.value.push({ id, ...newCargo.value });

  newCargo.value = {
    name: '',
    origin: '',
    destination: '',
    departureDate: '',
    status: 'Ожидает отправки',
  };
};

const updateCargoStatus = (cargo) => {
  if (
    cargo.status === 'Доставлен' &&
    new Date(cargo.departureDate) > new Date()
  ) {
    alert('Груз не может быть доставлен до даты отправления.');
    cargo.status = 'В пути';
  }
};

const filteredCargoList = computed(() =>
  filterStatus.value
    ? cargoList.value.filter((cargo) => cargo.status === filterStatus.value)
    : cargoList.value
);

const statusClass = (status) => ({
  'table-warning': status === 'Ожидает отправки',
  'table-primary': status === 'В пути',
  'table-success': status === 'Доставлен',
});
</script>

