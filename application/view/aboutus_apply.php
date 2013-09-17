<div class="aboutus applyjob"><form action="?action=aboutus_submit"><input type="hidden" name="jobid" value="<?php echo $data['detail']['id']; ?>" />
	<div class="content">
		<div class="table" style="">
			<div style="font-size:30px;color:#ececec">您申请的职位：<span style="font-size:25px;color:#aaa"><?php echo $data['detail']['name']; ?></span></div>
			<div class="tr"><label>真实姓名:</label><input type="text" name="name" /></div>
			<div style="color:#fff;height:19px;margin-top:18px;"><label>性别：</label><input type="radio" style="width:auto;height:19px" name="sex" value="1" /> 男<input type="radio" style="width:auto;margin-left:35px;height:19px" name="sex" value="0" /> 女</div>
			<div style="color:#fff;height:19px;margin-top:18px;"><label>婚姻：</label><input type="radio" style="width:auto;height:19px" name="marry" value="1" /> 未婚<input type="radio" style="width:auto;margin-left:20px;height:19px" name="marry" value="0" /> 已婚</div>			
			<div class="tr" style="margin-top:20px;"><label>身高/体重:</label><input type="text" name="size" /></div>
			<div class="tr"><label>联系电话:</label><input type="text" name="phone" /></div>
			<div class="tr"><label>出身日期:</label><input type="text" name="birthday" /></div>
			<div class="tr"><label>户籍所在地:</label><input type="text" name="birthaddress" /></div>
			<div class="tr"><label>电子信箱:</label><input type="text" name="email" /></div>
			<div class="tr"><label>联系地址:</label><input type="text" name="address" /></div>
		</div>
		<div class="table" style="margin-left:20px">
			<div style="color:#ff7f00;font-size:12px;letter-spacing:2px;line-height:18px">请务必详细填写您的资料，以便我们快速的处理～期待你能加入我们的大家庭</div>
			<div class="tr input" style="height:123px"><label>教育经验:</label><br /><textarea name="education" style="height:100px"></textarea></div>
			<div class="tr input" style="height:202px"><label>工作经历:</label><br /><textarea name="work" style="height:180px"></textarea></div>
		</div>
		<div class="clear" style="text-align:center;padding-top:25px"><a href="###" class="submit"><img src="assets/images/submit.png" /></a></div>
	</div></form>
</div>
<script>
var status = 0 ;
$(".submit").click(function(){
	if(status == 1){
		return false ;
	}else if(status == 2){
		alert('已经提交过了！');
		return false;
	}
	
	status = 1;
	$.ajax({
		url: '?action=aboutus_submit',
		type: 'POST',
		dataType: 'json',
		data: $("form").serialize(),
		success: function(result){
			if(result.status == 1){
				status = 2 ;
				alert('已经提交');
			}else{
				status = 0 ;
				alert('提交失败');
			}
		},
		error: function(xhr,status){
			status = 0 ;
			alert('提交失败:'+status);			
		}
	})
})
</script>