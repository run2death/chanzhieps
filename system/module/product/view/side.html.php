<?php 
$topCategories = $this->loadModel('tree')->getChildren(0, 'product');
$hotProducts   = $this->loadModel('product')->getHot(0, 8);
?>
<div class='col-md-3'>
  <div class='widget box radius'> 
    <h4 class='title'><?php echo $lang->product->hot?></h4>
    <ul class="media-list">
      <?php foreach($hotProducts as $product):?>
      <li class='media'>
        <?php 
        $title = $product->image->primary->title ? $product->image->primary->title : $product->name;
        if(empty($product->image)) 
        {
            echo html::a(inlink('view', "id=$product->id"), html::image($themeRoot . 'default/images/main/noimage.gif', "title='{$title}' class='adaptive'"), '', "class='media-image'");
        }
        else
        {
            echo html::a(inlink('view', "id=$product->id"), html::image($product->image->primary->smallURL, "title='{$title}' class='adaptive'"), '', "class='media-image'");
        }
        ?>
        <div class='media-body'>
          <h5 class='media-heading'><?php echo html::a(inlink('view', "id=$product->id"), $product->name);?></h5>
          <?php if($product->promotion != 0 && $product->price != 0):?>
          <p>
            <del><?php echo $lang->RMB . $product->price;?></del>
            <em><?php echo $lang->RMB . $product->promotion;?></em>
          </p>
          <?php elseif($product->promotion == 0 && $product->price != 0):?>
          <p><em><?php echo $lang->product->price . $lang->RMB . $product->price;?></em></p>
          <?php elseif($product->promotion != 0 && $product->price == 0):?>
          <p><em><?php echo $lang->product->promotion . $lang->RMB . $product->promotion;?></em></p>
          <?php endif;?>
        </div>
      </li>
      <?php endforeach;?>
    </ul>
  </div>
  <div class='widget box radius'> 
    <h4 class='title'><?php echo $lang->categoryMenu;?></h4>
    <ul class="pd-zero">
      <?php foreach($topCategories as $topCategory):?>
      <li>
        <?php
        $browseLink = $this->createLink('article', 'browse', "categoryID={$topCategory->id}");
        echo "<i class='icon-chevron-right'></i>";
        echo html::a($browseLink, $topCategory->name, '', "id='category{$topCategory->id}'");
        ?>
      </li>
      <?php endforeach;?>
    </ul>
  </div>
  <div class='c-both'></div>
  <div id='contact' class='widget box radius'>  
    <h4 class='title'><?php echo $lang->company->contactUs;?></h4>
    <?php foreach($contact as $item => $value):?>
    <dl>
      <dt><?php echo $this->lang->company->$item . $lang->colon;?></dt>
      <dd><?php echo $value;?></dd>
      <div class='c-both'></div>
    </dl>
    <?php endforeach;?>
  </div>
</div>
