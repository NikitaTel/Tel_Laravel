<?php


namespace App\Http\Filters;


class NewsFilter extends  QueryFilter
{
    public function thread($thread){
        if(!empty($thread)){
            return $this->builder->where('thread',$thread);
        }
    }
}
