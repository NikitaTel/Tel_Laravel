<?php
namespace App\Http\Filters;

class UserFilter extends  QueryFilter
{
        public function username($name){
           if(!empty($name)){
               return $this->builder->where('firstName',$name);
           }
        }

        public function birthday($date){
            if(!empty($date)){
                return $this->builder->where('birthday',$date);
            }
        }

        public function animals($animals){
            if(!empty($animals)){
                return $this->builder->where('favourite_animals',$animals);
            }
        }
}
