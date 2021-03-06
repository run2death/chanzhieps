<?php
/**
 * The edit view file of thread module of chanzhiEPS.
 *
 * @copyright   Copyright 2013-2013 青岛息壤网络信息有限公司 (QingDao XiRang Network Infomation Co,LTD www.xirangit.com)
 * @license     LGPL
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     thread
 * @version     $Id$
 * @link        http://www.chanzhi.org
 */
?>
<?php include '../../common/view/header.html.php';?>
<?php include '../../common/view/kindeditor.html.php';?>
<?php $common->printPositionBar($board, $thread);?>

<form method='post' id='ajaxForm' enctype='multipart/form-data'>
  <table class='table table-form'>
    <caption><?php echo $lang->thread->edit . $lang->colon . $thread->title;?></caption>
    <tr>
      <th class='w-100px'><?php echo $lang->thread->title;?></th>
      <td><?php echo html::input('title', $thread->title, 'style="width:90%"');?></td>
    </tr>
    <tr>
      <th><?php echo $lang->thread->content;?></th>
      <td><?php echo html::textarea('content', htmlspecialchars($thread->content), "rows='15' class='area-1'");?></td>
    </tr>
    <tr>
      <th><?php echo $lang->thread->file;?></th>
      <td>
        <?php
        $this->thread->printFiles($thread, $canManage = true);
        echo $this->fetch('file', 'buildForm');
        ?>
      </td>
    </tr>
    <tr>
      <th></th>
      <td colspan='2' align='center'><?php echo html::submitButton() . html::backButton();?></td>
    </tr>
  </table>
</form>
<?php include '../../common/view/footer.html.php';?>
