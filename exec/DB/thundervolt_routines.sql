-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: thundervolt.co.kr    Database: thundervolt
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping routines for database 'thundervolt'
--
/*!50003 DROP PROCEDURE IF EXISTS `delete_now` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`thundervolt`@`%` PROCEDURE `delete_now`()
BEGIN
	declare now_time datetime;
    set now_time = date_sub(now(),interval 3 minute);
    
    delete from patient_status_now 
    where now < now_time;
    
    delete from bms_status_now 
    where now < now_time;
    
    delete from battery_status_now 
    where now < now_time;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_status_day` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`thundervolt`@`%` PROCEDURE `delete_status_day`()
BEGIN
	declare x datetime;
    set x = date_sub(now(),interval 1 day);
    set x = date_format(x,"%Y-%m-%d 00:00:00");
    
    delete from patient_status
	where x <= now and now < date_format(x,"%Y-%m-%d 23:00:00");
    
    delete from bms_status
	where x <= now and now < date_format(x,"%Y-%m-%d 23:00:00");
    
    delete from battery_status
	where x <= now and now < date_format(x,"%Y-%m-%d 23:00:00");
    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `move_day` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`thundervolt`@`%` PROCEDURE `move_day`(IN x datetime,IN y datetime)
BEGIN
	declare cnt int;
    
    loop_xxxx:loop
		if (x=y) then
			leave loop_xxxx;
		end if;
        
        set cnt = (select count(*) from patient_status 
					where patient_id = 1 and x <= now and now < date_add(x,interval 1 hour));
	
		if (cnt =0)then
			set x = date_add(x,interval 1 hour);
            iterate loop_xxxx;
		end if;
        
		insert into patient_day(min_t,max_t,min_b,max_b,min_o,max_o,now,patient_id)
		select min(temperature),max(temperature),min(bpm),max(bpm),min(oxygen_saturation),max(oxygen_saturation),x,1
		from patient_status	
        where patient_id = 1 and x <= now and now < date_add(x,interval 1 hour);
        
        delete from patient_status
		where patient_id = 1 and  x <= now and now < date_add(x,interval 1 hour);
        
        
        set x = date_add(x,interval 1 hour);
        
        
	end loop;
		
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `move_day_battery` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`thundervolt`@`%` PROCEDURE `move_day_battery`(IN x datetime,IN y datetime)
BEGIN
	declare cnt int;
    loop_xxxx:loop
		if (x=y) then
			leave loop_xxxx;
		end if;
        
        set cnt = (select count(*) from battery_status 
					where battery_id = 1 and x <= now and now < date_add(x,interval 1 hour));
	
		if (cnt =0)then
			set x = date_add(x,interval 1 hour);
            iterate loop_xxxx;
		end if;
        
		insert into battery_day(min_v,max_v,now,battery_id)
		select min(voltage),max(voltage),x,1
		from battery_status	
        where battery_id = 1 and x <= now and now < date_add(x,interval 1 hour);
        
        delete from battery_status
		where battery_id = 1 and  x <= now and now < date_add(x,interval 1 hour);
        
        insert into battery_day(min_v,max_v,now,battery_id)
		select min(voltage),max(voltage),x,2
		from battery_status	
        where battery_id = 2 and x <= now and now < date_add(x,interval 1 hour);
        
        delete from battery_status
		where battery_id = 2 and  x <= now and now < date_add(x,interval 1 hour);
        
        
        set x = date_add(x,interval 1 hour);
        
        
	end loop;
		
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `move_day_bms` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`thundervolt`@`%` PROCEDURE `move_day_bms`(IN x datetime, IN y datetime)
BEGIN
	declare cnt int;
    loop_xxxx:loop
		if (x=y) then
			leave loop_xxxx;
		end if;
        
        set cnt = (select count(*) from bms_status 
					where bms_id = 1 and x <= now and now < date_add(x,interval 1 hour));
	
		if (cnt =0)then
			set x = date_add(x,interval 1 hour);
            iterate loop_xxxx;
		end if;
        
		insert into bms_day(min_t,max_t,now,bms_id)
		select min(temperature),max(temperature),x,1
		from bms_status	
        where bms_id = 1 and x <= now and now < date_add(x,interval 1 hour);
        
        delete from bms_status
		where bms_id = 1 and  x <= now and now < date_add(x,interval 1 hour);
        
        
        set x = date_add(x,interval 1 hour);
        
        
	end loop;
		
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `now_to_excel` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`thundervolt`@`%` PROCEDURE `now_to_excel`()
BEGIN
	declare now_before datetime;
    declare now_after datetime;
    declare x datetime;
    set now_before = date_sub(now(),interval 3 minute);
    set now_after = now();
    set x = date_format(now_before,"%Y-%m-%d %H:00:00");
    
    # now->excel
    # patient
	insert into patient_status_excel(temperature,bpm,oxygen_saturation,slope,now,patient_id)
	select temperature,bpm,oxygen_saturation,slope,now,patient_id 
	from patient_status_now
	where minute(now) = 0 and second(now) = 0 and now between now_before and now_after;

	# bms
	insert into bms_status_excel(temperature,now,bms_id)
	select temperature,now,bms_id
	from bms_status_now
	where minute(now) = 0 and second(now) = 0 and now between now_before and now_after;
	
    # battery
	insert into battery_status_excel(voltage,amount,now,battery_id)
	select voltage,amount,now,battery_id
	from battery_status_now
	where minute(now) = 0 and second(now) = 0 and now between now_before and now_after;
    
    # status -> day
    # patient
    insert into patient_day(min_t,max_t,min_b,max_b,min_o,max_o,now,patient_id)
	select min(temperature),max(temperature),min(bpm),max(bpm),min(oxygen_saturation),max(oxygen_saturation),x,patient_id
	from patient_status	
	where x <= now and now < date_add(x,interval 1 hour)
    group by patient_id;
	
    insert into bms_day(min_t,max_t,now,bms_id)
	select min(temperature),max(temperature),x,bms_id
	from bms_status	
	where x <= now and now < date_add(x,interval 1 hour)
    group by bms_id;
    
    insert into battery_day(min_v,max_v,now,battery_id)
	select min(voltage),max(voltage),x,battery_id
	from battery_status	
	where x <= now and now < date_add(x,interval 1 hour)
    group by battery_id;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `test_day` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`thundervolt`@`%` PROCEDURE `test_day`()
BEGIN
	declare x datetime;
    set x='2022-10-09 22:00:00';
    
    loop_xxxx:loop
		if (x='2022-10-10 03:00:00') then
			leave loop_xxxx;
		end if;
        select date_format(x,"%Y-%m-%d %H:00:00"),max(bpm),min(bpm)
        from patient_status
        where patient_id = 1 and x < now and now < date_add(x,interval 1 hour);
        
        set x = date_add(x,interval 1 hour);
	end loop;
		
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21 16:37:10
