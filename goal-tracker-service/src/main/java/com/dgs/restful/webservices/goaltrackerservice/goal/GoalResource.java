package com.dgs.restful.webservices.goaltrackerservice.goal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class GoalResource {
	
	@Autowired
	private goalHardCodedService goalService;

	@GetMapping("/users/{username}/goals")
	public List<Goal> getAllGoals(@PathVariable String username) {
		return goalService.findAll();
	}
	
	@GetMapping("/users/{username}/goals/{id}")
	public Goal getGoal(
			@PathVariable String username, @PathVariable long id) {
		return goalService.findById(id);
	}
	
	@DeleteMapping("/users/{username}/goals/{id}")
	public ResponseEntity<Void> deleteGoal(
			@PathVariable String username, @PathVariable long id) {
		
		Goal goal = goalService.deleteById(id);
		if (goal != null) {
			return ResponseEntity.noContent().build();
		}
		
		return ResponseEntity.notFound().build();
	}
}
