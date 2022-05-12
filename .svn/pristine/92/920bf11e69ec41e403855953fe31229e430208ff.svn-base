package com.xlf.common.util;

import java.util.Set;

import javax.persistence.Entity;

import cn.hutool.core.util.ClassUtil;

public class EntityUtil {
	
	public static Class<?> scanPackageByTag(String packages, String tag){
		
		Set<Class<?>> entitys = ClassUtil.scanPackageByAnnotation(packages, Entity.class);
		
		for (Class<?> clazz : entitys) {
			Entity entity = clazz.getAnnotation(Entity.class);
			
			if (tag.equals(entity.name())) {
				return clazz;
			}
		}
		
		return null;
	}
	
	public static void main(String[] args) {
		EntityUtil.scanPackageByTag("com.xlf.modules", "problem");
	}
}
