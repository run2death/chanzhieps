<?php
/**
 * The logo view file of site module of chanzhiEPS.
 *
 * @copyright   Copyright 2013-2013 青岛息壤网络信息有限公司 (QingDao XiRang Network Infomation Co,LTD www.xirangit.com)
 * @license     LGPL
 * @author      Chunsheng Wang <chunsheng@cnezsoft.com>
 * @package     site
 * @version     $Id$
 * @link        http://www.chanzhi.org
 */
?>
<?php include '../../common/view/header.admin.html.php';?>
<form method='post' id='ajaxForm' enctype='multipart/form-data'>
  <table class='table table-form'>
    <caption><?php echo $lang->site->setLogo;?></caption> 
    <tr>
      <th class='w-150px'>
        <?php if(isset($this->config->site->logo)) echo html::image($logo->webPath, "class='w-150px'");?>
      </th> 
      <td>
        <?php echo html::file('files');?>
        <?php echo html::submitButton();?>
      </td>
    </tr>
  </table>
</form>
<?php include '../../common/view/footer.admin.html.php';?>
