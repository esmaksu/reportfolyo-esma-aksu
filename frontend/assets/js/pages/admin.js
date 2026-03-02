document.addEventListener('DOMContentLoaded', () => {
  const users = [
    {id:1, name:'Ahmet Yılmaz', email:'ahmet@example.com', role:'Alıcı'},
    {id:2, name:'Mehmet Demir', email:'mehmet@example.com', role:'Satıcı'},
    {id:3, name:'Elif Kara', email:'elif@example.com', role:'Alıcı'}
  ];
  const tbody = document.getElementById('user-list');
  if (tbody) {
    users.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${u.id}</td><td>${u.name}</td><td>${u.email}</td><td>${u.role}</td>`;
      tbody.appendChild(tr);
    });
  }
});
