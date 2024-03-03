
// side 바 햄버거 생성
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');

    // Toggle sidebar when hamburger icon is clicked
    hamburger.addEventListener('click', function() {
        sidebar.style.left = sidebar.style.left === '-250px' ? '0' : '-250px';
    });
});
// side 바 햄버거 생성