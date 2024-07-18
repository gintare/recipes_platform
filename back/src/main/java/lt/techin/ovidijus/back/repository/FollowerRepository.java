package lt.techin.ovidijus.back.repository;

import lt.techin.ovidijus.back.model.Category;
import lt.techin.ovidijus.back.model.Follower;
import lt.techin.ovidijus.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowerRepository extends JpaRepository<Follower, Long> {

    List<Follower> getByFollowWhoAndFollowWhat(User followerWho, User followerWhat);
}
