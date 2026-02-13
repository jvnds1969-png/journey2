<script>
  // Accordion open/dicht
  document.querySelectorAll('.task-item').forEach((item) => {
    const header = item.querySelector('.task-header');
    if (!header) return;
    header.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });

  // Subtaken en status "in orde" naar patiëntenplan
  const patientTasksList = document.querySelector('#patient-tasks-done');

  function updateTaskStatus(taskId) {
    const subtasks = document.querySelectorAll(
      '.task-checkbox[data-task-id="' + taskId + '"]'
    );
    const allChecked = Array.from(subtasks).length > 0 &&
      Array.from(subtasks).every((cb) => cb.checked);

    const taskItem = document.querySelector(
      '.task-item[data-task-id="' + taskId + '"]'
    );
    if (taskItem) {
      taskItem.classList.toggle('completed', allChecked);
      const statusLabel = taskItem.querySelector('.task-status-label');
      if (statusLabel) {
        statusLabel.textContent = allChecked ? 'In orde' : 'Open';
      }
    }

    if (!patientTasksList) return;

    const existingLi = patientTasksList.querySelector(
      'li[data-task-id="' + taskId + '"]'
    );

    if (allChecked) {
      if (!existingLi) {
        const title = taskItem
          ? taskItem.querySelector('.task-title')?.textContent?.trim() || 'Taak'
          : 'Taak';
        const li = document.createElement('li');
        li.dataset.taskId = taskId;
        li.textContent = title + ' – in orde';
        patientTasksList.appendChild(li);
      }
    } else {
      if (existingLi) {
        existingLi.remove();
      }
    }
  }

  document.querySelectorAll('.task-checkbox').forEach((cb) => {
    cb.addEventListener('change', () => {
      const taskId = cb.dataset.taskId;
      if (!taskId) return;
      updateTaskStatus(taskId);
    });
  });
</script>
