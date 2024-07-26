package lt.techin.ovidijus.back.repository;

import lt.techin.ovidijus.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserName(String name);

    Optional<User> findById(Long id);

    Optional<User> findByEmail(String email);

    Optional<User> findUserById (Long id);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);

}
