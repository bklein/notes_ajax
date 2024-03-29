$(document).ready(function(){

	


  $("#new_task_form").submit(function(event){
    event.preventDefault();
    
    $.post('/', $("#new_task_form").serialize(), function(data){
        //alert(data);
        $("#tasks").prepend(data);    
        $("#new_task_form").each(function(){this.reset();});
      });
  });

	$("a").live("click", function(){
		var id = $(this).attr("id"); // get object ID
		if (id.substring(0,9) == "task_edit"){
			var task_id = id.substring(10);
			var target_dom = "#article_" + task_id;
			var url = "/" + task_id;
			$.get(url, function(data){$(target_dom).html(data);});
			return false;
		} else if (id.substring(0,8) == "task_del"){
			var task_id = id.substring(9);
			if (!confirm("Delete?")){
				return false;
			} 
			var url = "/" + task_id;
			var target_dom = "#article_" + task_id;
			$.post(url, {_method: "delete"}, function(){$(target_dom).replaceWith('');});
			return false;
		}
	});

	$("#edit").live("submit", function(event){
		event.preventDefault();
		var url = $("#edit").attr("action");
		var task_id = url.substring(1);
		var target_dom = "#article_" + task_id;
		$.post(url, $("#edit").serialize(), function(data){$(target_dom).replaceWith(data);});
	});


});

