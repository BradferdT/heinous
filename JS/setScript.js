$(document).ready(function(){
  generalSettings();
  themeSet();
  $('#volume').on('change', function(){
    localStorage.setItem('volume', $(this).val() / 100);
  })

$('input[name=theme]').change(function(){
  localStorage.setItem('theme', $(this).attr('id'));
})

  function generalSettings(){
    if(localStorage.getItem('volume') == null){
      localStorage.setItem('volume', '1.0');
    }
    $('#volume').prop('value', localStorage.getItem('volume') * 100);
  }
  function themeSet(){
    if(localStorage.getItem('theme') == null){
      localStorage.setItem('theme', 'dark');
    }
    $(`#${localStorage.getItem('theme')}`).prop('checked', true);
  }
});
